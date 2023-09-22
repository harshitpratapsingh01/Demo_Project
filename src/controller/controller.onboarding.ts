
import { Sessions } from "./controller.session";
import { UserService } from "../services/user.service";

export class UserOnborading {
    static async signup(payload, h) {
        try {
            const response = await UserService.signupService(payload);
            if (!response) {
                return h.response({ status: "Error in Registering User" }).code(409);
            }
            if (response == "Exist") {
                return h.response({ message: "Username Already Exist" })
            }
            return h.response({ status: "SignUp Success", UserDetails: response }).code(201);
            // const successMessage = 'Registration successful! You can now log in.';

            // return h.redirect('/message');
        }
        catch (err) {
            return h.response({ status: "server error" }).code(500);
        }
    }


    static async login_user(payload, request, h) {

        try {
            const response = await UserService.loginService(payload);
            if (!response) {
                return h.response({ status: "User not found" }).code(404);
                // return h.view('message9');
            }

            if (response === "Incorrect") {
                return h.response({ status: "Incorrect Password" }).code(404);
            }
            await Sessions.maintain_session(response.isUser);
            return h.response({ status: "loggedIn Successfully", response }).code(200);
            // return h.redirect('/home');
            // const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
            // h.state('token', token, {
            //     isHttpOnly: true,
            // });
            // return h.redirect('/home?' + queryParams.toString());
        }
        catch (err) {
            return h.response({ status: "Server Error" }).code(500);
        }
    }


    static async logout_user(user, h) {
        try {
            const response = await UserService.logoutService(user);
            if (!response) {
                return h.response({ message: "User not found" }).code(404);
            }
            if (!Sessions.sessionOut(response)) {
                return h.response({ message: "Session not found" }).code(404);
            }
            return h.response({ message: "User Logout Successfully", response }).code(200);
            // return h.redirect('/');
        }
        catch (err) {
            return h.response({ message: "Server Error" }).code(500);
        }
    }


    static async forgot_password(email, h) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await UserService.forgotPasswordService(email);
                if (response == "Not Found") {
                    return reject(h.response({ message: 'Email not found' }).code(404));
                }

                response.transporter.sendMail(response.mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return reject(h.response({ message: 'Error sending email' }).code(500));
                    } else {
                        console.log('Email sent: ' + info.response);
                        return resolve(h.response({ message: 'Password reset OTP sent to email' }).code(200));
                        // return resolve(h.redirect('/resetPass'))
                    }
                });
            }
            catch (error) {
                console.log(error);
                return reject(h.response({ message: 'Server error' }).code(500));
            }
        });
    }


    static async reset_password(payload, h) {
        try {
            const response = await UserService.resetPasswordService(payload);
            if (response === "Invalid User") {
                return h.response({ message: 'Invalid User' }).code(400);
            }
            else if (response === "Invalid OTP") {
                return h.response({ error: 'Invalid OTP' }).code(401);
            }
            else if(response === "Same Password"){
                return h.response({ error: 'Enter a New Password from Previous Password' }).code(401);
            }
            return h.response({ message: 'Password reset successful' }).code(200);
            // return h.redirect('/login');
        }
        catch (error) {
            console.log(error);
            return h.response({ message: 'Server error' }).code(500);
        }
    }

}