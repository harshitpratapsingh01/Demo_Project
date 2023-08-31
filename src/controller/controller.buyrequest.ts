import { User } from "../models/DbSchema";
import { Property } from "../models/schema.property";
import { Redis } from "../middleware/redis/redis.session";
import { Buyrequest } from "../models/BuyRequest.model";
import { BuyRequest } from "./controller.request";

export class Request{
    static async addRequest(user,property_id,h){
        try{
            const isUser: any = await User.findOne({where: {email: user.email}});
            if(!isUser){
                return h.response({message: "User Not Found"}).code(404);
            }
            const status = await Redis.isActiv(isUser);
            if (!status) {
                return h.response({ message: "Please Login First" }).code(400);
            }

            const requetsDetails = ({
                user_id: isUser.id,
                property_id: property_id
            })
            const requests = await Buyrequest.create(requetsDetails);
            console.log(requests);

            await BuyRequest.property_buy_request(isUser, property_id);

            const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
            return h.redirect('/message3?' + queryParams.toString());
        }
        catch(error){
            console.log(error);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }
}