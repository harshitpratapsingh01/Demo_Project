import { types } from "joi";
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
            return UserOperations.set_profile_pic(user, request, h);
        },
        options: {
            auth: 'user',
            payload: {
                output: 'stream',
                maxBytes: 5000000,
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },
            tags: ['api','useroperation'],
        },
    }
]