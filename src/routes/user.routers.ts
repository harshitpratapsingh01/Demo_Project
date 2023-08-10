import { request } from 'http';
import { UserOnborading } from '../controller/controller.onboarding';
import { Validate } from '../middleware/user.validation';
import Joi from "joi"

const UserRoutes = [
    {
        method: 'POST',
        path: '/signup',
        handler: (request, h) => {
            const payload = request.payload;
            return UserOnborading.signup(payload, h);
        },
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(6).max(30).required(),
                    name: Joi.string().min(6).max(30).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(30).required(),
                    mobile_no: Joi.number().min(6000000000).max(9999999999).required(),
                    profilePic: Joi.binary()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const payload = request.payload;
            return UserOnborading.login_user(payload, h);
        },
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(30).required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/logout',
        handler: (request, h) => {
            const token = request.headers.authorization;
            return UserOnborading.logout_user(token, h);
        }
    },
    {
        method: "POST",
        path: "/forgot_pass",
        handler: (request, h) => {
            const {email} = request.payload
            return UserOnborading.forgot_password(email, h);
        },
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                })
            }
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
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(30).required()
                })
            }
        }
    }
]

export default UserRoutes;