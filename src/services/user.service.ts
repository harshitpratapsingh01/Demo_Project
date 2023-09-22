import { User } from "../models/DbSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Redis } from "../utils/redis.session";
import nodemailer from "nodemailer"


export class UserService {
    static async signupService(data) {
        const isUser = await User.findOne({ where: { username: data.username } });
        if (isUser) {
            return "Exist";
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(data.password, salt);
        const user_details = ({
            username: data.username,
            name: data.name,
            email: data.email,
            password: hashpassword,
            mobile_no: data.mobile_no,
            profilePic: data.profilePic
        });
        const user = await User.create(user_details);
        if (!user) {
            return null;
        }
        return user;
    }

    static async loginService(data) {
        const isUser: any = await User.findOne({ where: { email: data.email } });
        if (!isUser) {
            return null
        }
        const hashpass = isUser.password;
        if (!await bcrypt.compare(data.password, hashpass)) {
            return "Incorrect";
        }
        const token = jwt.sign({ email: data.email, username: isUser.username }, process.env.SECRET_KEY, { expiresIn: '2d' });
        return { isUser, token }
    }

    static async logoutService(data) {
        const isUser: any = await User.findOne({ where: { email: data.email } });
        if (!isUser) {
            return null;
        }
        return isUser
    }

    static async forgotPasswordService(email) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return "Not Found"
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
        return { transporter, mailOptions };
    }

    static async resetPasswordService(data) {
        const user: any = await User.findOne({ where: { email: data.email } });

        if (!user) {
            return "Invalid User"
        }

        const userOTP = await Redis.get_otp(data.email);
        if (!userOTP || userOTP !== data.otp) {
            return "Invalid OTP"
        }

        console.log(user.password);
        if (await bcrypt.compare(data.newPassword, user.password)) {
            return "Same Password";
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(data.newPassword, salt);
        user.password = hashpassword
        console.log(user.password);
        await user.save();

        return true;
    }
}