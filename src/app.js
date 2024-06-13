import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import db from "../database/db.js";
import jwt from "jsonwebtoken";
import { html, verifyEmailHTML } from "./templateMail.js";
import bcrypt from "bcrypt";
import validator from "validator";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "hermawan.inf@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const [results] = await db.query("SELECT * FROM User WHERE email = ?", [
      email,
    ]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
      expiresIn: "15m",
    });

    await transporter.sendMail({
      from: '"Stuntguard 👻" <stuntguard@gmail.com>',
      to: email,
      subject: "Reset Password",
      html: html(token),
    });

    res.status(200).json({ status: "success", message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/reset-password/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({ message: "Token expired" });
        }
        return res.status(400).json({ message: "Invalid token" });
      }

      res.status(200).json({ status: "success", message: "Token verified" });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.post("/reset-password/update", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password required" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({ message: "Token expired" });
        }
        return res.status(400).json({ message: "Invalid token" });
      }

      const [results] = await db.query("SELECT * FROM User WHERE email = ?", [
        decoded.email,
      ]);

      if (results.length === 0) {
        return res.status(404).json({ message: "Email not found" });
      }

      const genSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, genSalt);

      if (!hashedPassword)
        return res.status(500).json({ message: "Internal server error" });

      await db.query("UPDATE User SET password = ? WHERE email = ?", [
        hashedPassword,
        decoded.email,
      ]);

      res.status(200).json({ status: "success", message: "Password updated" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/checkEmail", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    const [results] = await db.query("SELECT * FROM User WHERE email = ?", [
      email,
    ]);

    if (results.length !== 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
      expiresIn: "15m",
    });

    await transporter.sendMail({
      from: '"Stuntguard 👻" <stuntguard@gmail.com>',
      to: email,
      subject: "Verify Email",
      html: verifyEmailHTML(token),
    });

    res.status(200).json({ status: "success", message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/checkEmail/verify", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({ message: "Token expired" });
        }
        return res.status(400).json({ message: "Invalid token" });
      }

      res.status(200).json({ status: "success", message: "Token verified" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(8080, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
