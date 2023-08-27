import { request } from 'http';
import { UserOnborading } from '../controller/controller.onboarding';
import Joi from "joi"
// import Path from 'path';

const UserRoutes = [
    {
        method: 'POST',
        path: '/submitSignup',
        handler: (request, h) => {
            const payload = request.payload;
            return UserOnborading.signup(payload, h);
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(6).max(30).required(),
                    name: Joi.string().min(6).max(30).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(30).required(),
                    mobile_no: Joi.number().min(6000000000).max(9999999999).required(),
                    profilePic: Joi.string().trim()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/submitLogin',
        handler: (request, h) => {
            const payload = request.payload;
            return UserOnborading.login_user(payload, request, h);
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(30).required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request
            return UserOnborading.logout_user(user, h);
        }
    },
    {
        method: "POST",
        path: "/forgot_pass",
        handler: (request, h) => {
            const { email } = request.payload
            return UserOnborading.forgot_password(email, h);
        },
        options: {
            auth: false,
            // validate: {
            //     payload: Joi.object({
            //         email: Joi.string().email().required(),
            //     })
            // }
        }
    },
    {
        method: "POST",
        path: "/reset_pass",
        handler: (request, h) => {
            const payload = request.payload
            return UserOnborading.reset_password(payload, h);
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    otp: Joi.number().required(),
                    newPassword: Joi.string().min(8).max(30).required()
                })
            }
        }
    }
]

export default UserRoutes;