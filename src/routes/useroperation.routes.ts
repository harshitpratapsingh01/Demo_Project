import { UserOperations } from "../controller/constroller.useroperation";
import { upload } from "../middleware/imageUploader/image.uploader";

export const OperationRoutes = [
    {
        method: "GET",
        path: "/getprofile",
        handler: (request, h) => {
            const token = request.headers.authorization;
            return UserOperations.getProfile(token, h);
        }
    },
    {
        method: "DELETE",
        path: "/deleteUser",
        handler: (request, h) => {
            const token = request.headers.authorization;
            return UserOperations.deleteUser(token, h);
        }
    },
    {
        method: "POST",
        path: "/setProfile",
        handler: (request, h) => {
            upload.single('photo');
            return UserOperations.set_profile_pic(request, h);
        }
    }
]