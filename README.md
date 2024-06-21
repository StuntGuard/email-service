Email Service API Documentation
===============================

This repository contains the source code and documentation for the Email Service API, which is designed to handle email-related functionalities for the Stuntuguard mobile application and its associated web server.

Purpose
-------

The Email Service API is a microservice intended to support the main Stuntuguard API. It provides endpoints specifically for handling email operations such as password reset and email verification.

Endpoints
---------

* **POST /reset-password**: Endpoint for initiating a password reset process.
* **POST /reset-password/verify**: Endpoint for verifying the reset token and initiating the password update.
* **POST /reset-password/update**: Endpoint for updating the user's password after verification.
* **POST /checkEmail**: Endpoint for sending token to check if an email valid or not.
* **POST /checkEmail/verify**: Endpoint for verifying the email address with token have been send before

Usage
-----

To use the Email Service API effectively, follow these steps:

1.  **Integration**: Integrate the API endpoints into your main Stuntuguard application or any other application requiring email functionalities.
2.  **Authentication**: Ensure that appropriate authentication and authorization mechanisms are in place to secure these endpoints.
3.  **Data Validation**: Validate input data to prevent security vulnerabilities such as injection attacks or data loss
