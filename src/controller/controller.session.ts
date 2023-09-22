import { Redis } from "../utils/redis.session";
import SessionService from "../services/user_session.service";

export class Sessions {
    static async maintain_session(isUser) {
        try{
            const session = await SessionService.session_store(isUser)
            if(!session){
                console.log("Error in Storing Session");
            }
            else if(session == "Active"){
                console.log("User Is Already Active");
            }
            else{
                console.log("Session Created Successfully: ", session);
                await Redis.maintain_session_redis(isUser);
            }
        }
        catch(error){
            console.log("Server Error: ", error);
        }
    }

    static async sessionOut(user){
        try{
            const sessionOut = await SessionService.update_session(user.id)
            if(!sessionOut){
                console.log("Error in Updating SessionOut");
                return false;
            }
            console.log("SessionOut Updated Successfully");
            await Redis.logout_session_redis(user);
            return true;
        }
        catch(error){
            console.log("Server Error: ", error);
        }
    }
}