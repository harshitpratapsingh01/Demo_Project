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
            const { file } = request.payload;
            return UserOperations.set_profile_pic(user, file, request, h);
        },
        // config: {
        //     validate: {
        //         headers: {
        //             'accept': Hapi.types.accept('multipart / form-data', 'application/json') // Define the accepted content types here
        //         }
        //     }
        // },
        options: {
            auth: 'user',
            payload: {
                maxBytes: 100000000,
                parse: true,
                allow: "multipart/form-data",
                timeout: false,
                output: "file"
            },
        },
    }
]