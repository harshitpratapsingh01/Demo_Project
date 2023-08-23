import { types } from "joi";
import Hapi from "@hapi/hapi"
import { UserOperations } from "../controller/constroller.useroperation";
import upload from "../middleware/imageUploader/image.uploader";

export const OperationRoutes = [
    {
        method: "GET",
        path: "/getprofile",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            return UserOperations.getProfile(user, h);
        }
    },
    {
        method: "DELETE",
        path: "/deleteUser",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request
            return UserOperations.deleteUser(user, h);
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
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            }
        },
    }
]