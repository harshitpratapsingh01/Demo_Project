
import { UserOpertaionService } from "../services/user_operation.service";


export class UserOperations {
    static async getProfile(user, h) {
        try {
            const response = await UserOpertaionService.getProfileService(user);
            if (!response) {
                return h.response({ message: "User not found" }).code(404);
            }
            return h.response({ message: "Success", UserData: response }).code(200);
            // return h.view('displayDetails', { user: isUser });
            // else {
            //     return h.response({ message: "please login first" }).code(400);
            //     // return h.view('message2')
            // }
        }
        catch (err) {
            return h.response({ message: "Error" }).code(500);
        }
    }

    static async deleteUser(user, h) {
        try {
            const response = await UserOpertaionService.deleteProfileService(user);
            if (!response) {
                return h.response({ message: "User not found" }).code(400);
            }
            return h.response({ message: "Account Deleted Successfully" }).code(200);
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "error" }).code(500);
        }
    }


    static async set_profile_pic(user, data, h) {
        try {
            if (!user) {
                return h.response({ message: "User Not Found" }).code(404);
            }
            // const data: any = request.payload;

            if (!data.file) {
                return h.response({ message: "No file provided" }).code(400);
            }
            const response = await UserOpertaionService.setUserProfileService(user, data);

            return new Promise((resolve, reject) => {
                if (!response) {
                    return reject(h.response({ message: "Error updating profilePic" }).code(500));
                }
                return resolve(h.response({ message: "ProfilePic uploaded successfully", response }).code(200));
            });

            // return new Promise((resolve, reject) => {
            //     file.on('finish', async () => {
            //         try {
            //             // Update user's profilePic in the database
            //             const result = await User.update({ profilePic: name }, { where: { email: user.email } });
            //             resolve(h.response({ message: "ProfilePic uploaded successfully" }).code(200));
            //             // const isUser = await User.findOne({ where: { email: user.email }});
            //             // resolve(h.view('displayDetails', {user: isUser}));
            //         } catch (err) {
            //             console.error(err);
            //             reject(h.response({ message: "Error updating profilePic" }).code(500));
            //         }
            //     });

            //     file.on('error', (err) => {
            //         console.error(err);
            //         reject(h.response({ message: "Error writing file" }).code(500));
            //     });
            // });
        } catch (err) {
            console.log(err);
            return h.response({ message: "Error" }).code(500);
        }
    }

}