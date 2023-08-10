import Session from "../models/model.session";
import { Redis } from "../middleware/redis/redis.session";

export class Sessions {
    static async maintain_session(isUser) {
        try {
            const user = isUser.id;
            const isSession: any = await Session.findOne({ where: { userId: user } })
            console.log(isSession);
            if (!isSession) {
                const session_details = {
                    userId: user,
                    status: true
                };
                const session = await Session.create(session_details);
                console.log("Session stored successfully");
                console.log(session);
            }
            else {
                if (!isSession.status) {
                    await Session.update({ status: !isSession.status }, { where: { userId: user } });
                    console.log("Session Activate");
                }
                else{
                    console.log("Session is already Active");
                }
            }
            await Redis.maintain_session_redis(isUser);
        }
        catch (err) {
            console.log("Server Error")
        }
    }

    static async update_session(user_id) {
        const isSession: any = await Session.findOne({ where: { userId: user_id } })
        if (isSession) {
            if (isSession.status) {
                await Session.update({ status: !isSession.status }, { where: { userId: user_id } });
                return true;
            }
            else {
                console.log("user already inactive")
                return false;
            }
        }
        else {
            return false;
        }
    }
}