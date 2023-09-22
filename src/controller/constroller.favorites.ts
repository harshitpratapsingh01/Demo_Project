import { FavoriteService } from "../services/favourites.sevice";
export class Favorite{
    static async addToFavorites(user,property_id,h){
        try{
            const response = await FavoriteService.addToFavorites(user,property_id);
            if(!response){
                return h.response({message: "User Not Found"}).code(404);
            }
            // if (!status) {
            //     return h.response({ message: "Please Login First" }).code(400);
            //     // return h.view('message2');
            // }
            if(response === "Already"){
                return h.response({message: "Already added to faviourites"});
                // return h.redirect('/message5');
            }

            if(response === "Not Found"){
                return h.response({message: "Property You want to Add to Your Favourites is Not Found"}).code(404);
            }
            return h.response({success: true, message: "Property Successfully added to Favourites", response}).code(200);
            // return h.redirect('/message4');
        }
        catch(err){
            console.log(err);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }

    static async getPropertyFromFavorite(user,request,h){
        try{
            const pageNumber = request.params.pageNumber || 1;
            const pageSize = request.params.pageSize || 10;
            const response = await FavoriteService.getPropertyFromFavorite(user,pageNumber,pageSize);
            if(!response){
                return h.response({message: "User not Found"}).code(404);
            }
            if(response === "Not Found"){
                return h.response({message: "No Property found at Favorites"}).code(404);
            }
            return h.response({success: true, message: "Favorites Property's are: ", response});
                // return h.view('displayFavorite', {user: isUser, property: propertyDetails})
        }
        catch(err){
            console.log(err);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }

    static async removeFromFavorite(user,property_id,h){
        try{
            const response = await FavoriteService.removeFromFavorite(user,property_id);
            if(!response){
                return h.response({message: "User Not Found"}).code(404);
            }

            if(response==="Not Found"){
                return h.response({message: "No Property Found"}).code(404);
            }

            return h.response({message: "Property Removed From Favourites Successfully"}).code(200);
            // return h.redirect('/getFavorites');
        }
        catch(err){
            console.log(err);
            return h.response({message: "Internal Server Error"}).code(500);
        }
    }
}