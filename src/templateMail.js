export const html = (token) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                width: 100%;
                text-align: center;
            }
            .header {
                background-color: #007BFF;
                padding: 10px;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                color: #ffffff;
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .content h2 {
                margin-top: 0;
            }
            .content p {
                line-height: 1.6;
            }
            .token {
                font-size: 24px;
                margin: 20px 0;
                padding: 10px;
                border: 1px dashed #007BFF;
                display: inline-block;
                border-radius: 8px;
                color: #007BFF;
                font-weight: bold;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>StuntGuard</h1>
            </div>
            <div class="content">
                <h2>Reset Password Request</h2>
                <p>We received a request to reset your password for your StuntGuard account. Use the code below to reset your password. This code is valid for 10 minutes.</p>
                <div class="token">${token}</div>
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <p>Thank you,<br>The StuntGuard Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 StuntGuard. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const verifyEmailHTML = (token) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                width: 100%;
                text-align: center;
            }
            .header {
                background-color: #007BFF;
                padding: 10px;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                color: #ffffff;
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .content h2 {
                margin-top: 0;
            }
            .content p {
                line-height: 1.6;
            }
            .token {
                font-size: 24px;
                margin: 20px 0;
                padding: 10px;
                border: 1px dashed #007BFF;
                display: inline-block;
                border-radius: 8px;
                color: #007BFF;
                font-weight: bold;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>StuntGuard</h1>
            </div>
            <div class="content">
                <h2>Verify Your Email</h2>
                <p>Thank you for registering with StuntGuard! Please use the code below to verify your email address. This code is valid for 10 minutes.</p>
                <div class="token">${token}</div>
                <p>If you did not create an account with us, please ignore this email or contact support if you have questions.</p>
                <p>Thank you,<br>The StuntGuard Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 StuntGuard. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};
