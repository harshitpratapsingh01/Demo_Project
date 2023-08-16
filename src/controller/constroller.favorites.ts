import Favorites from "../models/user.favourites";
import { Property } from "../models/schema.property";
import { User } from "../models/DbSchema";

export class Favorite{
    static async addToFavorites(user,property_id,h){
        try{
            const isUser:any = await User.findOne({where: {email: user.email}});
            if(!isUser){
                return h.response({message: "User Not Found"}).code(404);
            }
            const favorite_details = ({
                property_id: property_id,
                user_id: isUser.id
            })
            const favorites = await Favorites.create(favorite_details);
            console.log(favorites);
            return h.response({message: "Property Added to Favorites Successfully"}).code(200);
        }
        catch(err){
            console.log(err);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }

    static async getPropertyFromFavorite(user,h){
        try{
            const isUser: any = await User.findOne({where: {email: user.email}});
            if(!isUser){
                return h.response({message: "User not Found"}).code(404);
            }
            const propertys = await Favorites.findAll({where: {user_id: isUser.id}});
            if(!propertys){
                return h.response({message: "No Property found at Favorites"}).code(404);
            }
            else{
                return h.response({message: "Favorites Property's are: ", propertys});
            }
        }
        catch(err){
            console.log(err);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }

    static async removeFromFavorite(user,property_id,h){
        try{
            const isUser = await User.findOne({where: {email: user.email}});
            if(!isUser){
                return h.response({message: "User Not Found"}).code(404);
            }
            const isProperty = await Favorites.findOne({where: {property_id: property_id}});
            if(!isProperty){
                return h.response({message: "No Property Found"}).code(404);
            }
            else{
                await isProperty.destroy();
                return h.response({message: "Property Removed Successfully"}).code(200);
            }
        }
        catch(err){
            console.log(err);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }
}