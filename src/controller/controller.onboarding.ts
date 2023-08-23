import { User } from "../models/DbSchema";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { Sessions } from "./controller.session";
import { Redis } from "../middleware/redis/redis.session";
import nodemailer from "nodemailer"

export class UserOnborading {
    static async signup(payload, h) {
        try {
            const isUser = await User.findOne({ where: { username: payload.username } });
            if (!isUser) {
                const salt = await bcrypt.genSalt(10);
                const hashpassword = await bcrypt.hash(payload.password, salt);
                const user_details = ({
                    username: payload.username,
                    name: payload.name,
                    email: payload.email,
                    password: hashpassword,
                    mobile_no: payload.mobile_no,
                    profilePic: payload.profilePic
                });
                const users = await User.create(user_details);
                console.log(users);
                // const successMessage = 'Registration successful! You can now log in.';
                // return h.response({ status: "SignUp Success" }).code(201);
                return h.redirect('/login');
            }
            else {
                return h.response({ status: "Username Already Exist" }).code(409);
            }
        }
        catch (err) {
            return h.response({ status: "server error" }).code(500);
        }
    }


    static async login_user(payload, request, h) {

        try {
            const isUser: any = await User.findOne({ where: { email: payload.email } });
            console.log(isUser);
            if (isUser) {
                const hashpass = isUser.password;
                if (bcrypt.compare(payload.password, hashpass)) {
                    const token = jwt.sign({ email: payload.email }, process.env.SECRET_KEY, { expiresIn: '2d' });
                    console.log(token);
                    await Sessions.maintain_session(isUser);
                    // return h.response({ status: "loggedIn Successfully", token }).code(200);
                    // return h.redirect('/home');
                    const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
                    h.state('token', token, {
                        isHttpOnly: true,
                    });
                    return h.redirect('/home?' + queryParams.toString());
                }
                else {
                    return h.response({ status: "Incorrect Password" }).code(404);
                }
            }
            else {
                return h.response({ status: "User not found" }).code(404);
            }
        }
        catch (err) {
            return h.response({ status: "Server Error" }).code(500);
        }
    }


    static async logout_user(user, h) {
        try {
            const isUser: any = await User.findOne({ where: { email: user.email } });
            console.log(isUser)
            if (isUser) {
                const user = isUser.id;
                if (Sessions.update_session(user)) {
                    await Redis.logout_session_redis(isUser);
                    return h.response({ message: "User Logout Successfully" }).code(200);
                }
                else {
                    return h.response({ message: "Session not found" }).code(404);
                }
            }
            else {
                return h.response({ message: "User not found" }).code(404);
            }
        }
        catch (err) {
            return h.response({ message: "Server Error" }).code(500);
        }
    }


    static async forgot_password(email, h) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ where: { email: email } });
                if (!user) {
                    return resolve(h.response({ message: 'Email not found' }).code(404));
                }

                let OTP = Math.floor(1000 + Math.random() * 9000);
                Redis.save_otp(email, OTP);

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                const mailOptions = {
                    from: process.env.EMAIL_ADDRESS,
                    to: email,
                    subject: 'Password Reset Request',
                    text: ` You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n YOUR RESET PASSWORD OTP IS: ${OTP}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return resolve(h.response({ message: 'Error sending email' }).code(500));
                    } else {
                        console.log('Email sent: ' + info.response);
                        // return resolve(h.response({ message: 'Password reset OTP sent to email' }).code(200));
                        return resolve(h.redirect('/resetPass'))
                    }
                });
            } catch (error) {
                console.log(error);
                return resolve(h.response({ message: 'Server error' }).code(500));
            }
        });
    }


    static async reset_password(payload, h) {
        try {
            const user: any = await User.findOne({ where: { email: payload.email } });

            if (!user) {
                return h.response({ message: 'Invalid User' }).code(400);
            }

            const userOTP = await Redis.get_otp(payload.email);
            console.log(userOTP);
            if (!userOTP || userOTP !== payload.otp) {
                return h.response({ error: 'Invalid OTP' }).code(401);
            }

            console.log(user.password);
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(payload.newPassword, salt);
            user.password = hashpassword
            console.log(user.password);
            await user.save();

            // return h.response({ message: 'Password reset successful' }).code(200);
            return h.redirect('/login');
        }
        catch (error) {
            console.log(error);
            return h.response({ message: 'Server error' }).code(500);
        }
    }

}