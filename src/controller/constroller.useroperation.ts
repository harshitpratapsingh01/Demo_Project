import { User } from "../models/DbSchema";
import { Redis } from "../middleware/redis/redis.session";
import  upload  from "../middleware/imageUploader/image.uploader";
import fs from "fs";


export class UserOperations{
    static async getProfile(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
            if (isUser) {
                const status = await Redis.isActiv(isUser);
                if (status) {
                    return h.response({ message: "Success", isUser }).code(200);
                }
                else {
                    return h.response({ message: "please login first" }).code(400);
                }
            }
            else {
                return h.response({ message: "User not found" }).code(404);
            }
        }
        catch (err) {
            return h.response({ message: "Error" }).code(500);
        }
    }

    static async deleteUser(user, h){
        try{
            const isUser = await User.findOne({where: {email: user.email}});
            if(!isUser){
                return h.response({message: "User not found"}).code(400);
            }
            else{
                await isUser.destroy();
                return h.response({message: "Account Deleted Successfully"}).code(200);
            }
        }
        catch(err){
            console.log(err);
            return h.response({message: "error"}).code(500);
        }
    }


    static async set_profile_pic(user, file, request: any, h){
        try{
            console.log(user)
            if(!user){
                return h.response({message: "User Not Found"}).code(404);
            }
            const file = request.file;
            const fileData = fs.readFileSync(file.path);
            const bufferData = Buffer.from(fileData);
            console.log(bufferData);
            const result = User.update({profilePic: bufferData}, {where:{email: user.email}});

            if(!result){
                return h.response({message: "Something went wrong"}).code(400);
            }
            return h.response({message: "ProfilePic uploaded successfully"});
        }
        catch(err){
            console.log(err);
            return h.response({message: "Error"}).code(500);
        }
    }
}