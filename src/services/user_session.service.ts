import { Session } from "../models/model.session";

class SessionService{
    static async session_store(user){
        try{
            const isSession:any = await Session.findOne({where:{userId: user.id}});
            if (!isSession) {
                const session_details = {
                    userId: user.id,
                    status: true
                };
                const session = await Session.create(session_details);
                return session;
            }
            else {
                if (!isSession.status) {
                    const updateSession = await Session.update({ status: !isSession.status }, { where: { userId: user.id } });
                    return updateSession;
                }
                else{
                    return "Active"
                }
            }
        }
        catch(error){
            console.log("Session Error: ", error);
            return false;
        }
    }

    static async update_session(user_id) {
        const isSession:any = await Session.findOne({where:{ userId: user_id }} )
        if (isSession) {
            if (isSession.status) {
                await Session.update({ status: !isSession.status }, { where: { userId: user_id } });
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

export default SessionService;