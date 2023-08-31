import { Favorite } from "../controller/constroller.favorites";


export const FavoritesRoutes = [
    {
        method: "GET",
        path: "/addToFavorite/{id}",
        options:{
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.id;
            return Favorite.addToFavorites(user,property_id,h);
        }
    },
    {
        method: "GET",
        path: "/addToFavorite",
        options:{
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.id;
            return Favorite.addToFavorites(user,property_id,h);
        }
    },
    {
        method: "GET",
        path: "/getFavorites",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Favorite.getPropertyFromFavorite(user,h);
        }
    },
    {
        method: "GET",
        path: "/removeFromFavorite/{id}",
        options:{
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.id;
            return Favorite.removeFromFavorite(user,property_id,h);
        }
    }
]