import Joi from "joi"
import Hapi from "@hapi/hapi"
import { UserOperations } from "../controller/constroller.useroperation";
import upload from "../middleware/imageUploader/image.uploader";

export const OperationRoutes = [
    {
        method: "GET",
        path: "/getprofile",
        handler: (request, h) => {
            const { user } = request;
            return UserOperations.getProfile(user, h);
        },
        options: {
            auth: 'user',
            tags: ['api','useroperation'],
        }
    },
    {
        method: "DELETE",
        path: "/deleteUser",
        handler: (request, h) => {
            const { user } = request
            return UserOperations.deleteUser(user, h);
        },
        options: {
            auth: 'user',
            tags: ['api','useroperation'],
        }
    },
    {
        method: "POST",
        path: "/setProfile",
        handler: (request, h) => {
            const { user } = request
            const file = request.payload;
            return UserOperations.set_profile_pic(user, file, h);
        },
        options: {
            auth: 'user',
            tags: ['api','useroperation'],
            plugins: { 'hapi-swagger': { payloadType: 'form', consumes: ['multipart/form-data'] } },
            payload: {
                output: 'stream',
                maxBytes: 5000000, // 5MB maximum file size
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },
            validate: {
                payload: Joi.object({
                    file: Joi.any()
                        .meta({ swaggerType: 'file' })
                        .optional()
                })
            },
        },
    }
]