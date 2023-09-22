import { User } from "./DbSchema";
import { Session } from "./model.session";
import { Property } from "./schema.property";
import { Favorites } from "./user.favourites";
import { Buyrequest } from "./BuyRequest.model";
import { PropertyBuyRequest } from "./PropertyRequest.model";

export async function syncmodels() {
    try{
        await User.sync({alter: true});
        await Session.sync({alter: true});
        await Property.sync({ alter: true });
        await Favorites.sync({alter: true});
        await Buyrequest.sync({alter: true});
        await PropertyBuyRequest.sync({alter: true});
        console.log("all models sync successfully");
    }
    catch(err){
        console.log(err);
    }
}

syncmodels();