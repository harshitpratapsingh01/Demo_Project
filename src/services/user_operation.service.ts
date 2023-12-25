import { User } from "../models/DbSchema";
import { Session } from "../models/model.session";
import { Property } from "../models/schema.property";
import fs from "fs";
import { Favorites } from "../models/user.favourites";
import { Buyrequest } from "../models/BuyRequest.model";
import { PropertyBuyRequest } from "../models/PropertyRequest.model";

export class UserOpertaionService {
    static async getProfileService(user) {
        const isUser = await User.findOne({ where: { email: user.email }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
        if (!isUser) {
            return null;
        }
        return isUser
    }

    static async deleteProfileService(user) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null
        }
        const isProperty = await Property.findAll({ where: { seller_id: isUser.id } });
        const isSession = await Session.findOne({ where: { userId: isUser.id } });
        const isFavourites = await Favorites.findAll({ where: { user_id: isUser.id } });
        const isBuyHistory = await Buyrequest.findAll({ where: { user_id: isUser.id } });
        const isBuyRequest = await PropertyBuyRequest.findAll({where: {user_id: isUser.id}});

        if (isFavourites.length) {
            isFavourites.forEach(favourites => {
                favourites.destroy();
            });
        }
        if(isBuyRequest.length){
            isBuyRequest.forEach(buyrequest => {
                buyrequest.destroy();
            });
        }
        if (isBuyHistory.length) {
            isBuyHistory.forEach(buyhistory => {
                buyhistory.destroy();
            });
        }
        if (isProperty.length) {
            isProperty.forEach(property => {
                property.destroy();
            });
        }
        if (isSession) {
            await isSession.destroy();
        }
        await isUser.destroy();
        return true;
    }

    static async setUserProfileService(user,data) {
        const name = data.file.hapi.filename;
        const path = `${process.cwd()}/real-estate-html-template/img/` + name;
        const file = fs.createWriteStream(path);
        data.file.pipe(file);

        const result = await User.update({ profilePic: name }, { where: { email: user.email } });
        if(!result){
            return null;
        }
        return result;
    }
}