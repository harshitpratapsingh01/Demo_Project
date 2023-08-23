import { User } from "../models/DbSchema";
import { Redis } from "../middleware/redis/redis.session";
import upload from "../middleware/imageUploader/image.uploader";
import fs from "fs";


export class UserOperations {
    static async getProfile(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
            if (isUser) {
                const status = await Redis.isActiv(isUser);
                if (status) {
                    // return h.response({ message: "Success", isUser }).code(200);
                    return h.view('displayDetails', { user: isUser });
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

    static async deleteUser(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not found" }).code(400);
            }
            else {
                await isUser.destroy();
                return h.response({ message: "Account Deleted Successfully" }).code(200);
            }
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "error" }).code(500);
        }
    }


    static async set_profile_pic(user, request: any, h) {
        try {
            if (!user) {
                return h.response({ message: "User Not Found" }).code(404);
            }

            
            const data: any = request.payload;
            
            if (!data.file) {
                return h.response({ message: "No file provided" }).code(400);
            }
            const name = data.file.hapi.filename;
            const path = `${process.cwd()}/real-estate-html-template/img/` + name;
            const file = fs.createWriteStream(path);
            data.file.pipe(file);
            
            return new Promise((resolve, reject) => {
                file.on('finish', async () => {
                    try {
                        // Update user's profilePic in the database
                        const result = await User.update({ profilePic: name }, { where: { email: user.email } });
                        // resolve(h.response({ message: "ProfilePic uploaded successfully" }).code(200));
                        const isUser = await User.findOne({ where: { email: user.email }});
                        resolve(h.view('displayDetails', {user: isUser}));
                    } catch (err) {
                        console.error(err);
                        reject(h.response({ message: "Error updating profilePic" }).code(500));
                    }
                });

                file.on('error', (err) => {
                    console.error(err);
                    reject(h.response({ message: "Error writing file" }).code(500));
                });
            });
        } catch (err) {
            console.log(err);
            return h.response({ message: "Error" }).code(500);
        }
    }

}