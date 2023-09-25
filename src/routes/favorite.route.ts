import { Favorite } from "../controller/constroller.favorites";
import Joi from "joi";

export const FavoritesRoutes = [
    {
        method: "POST",
        path: "/addToFavorite/{property_id}",
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.property_id;
            return Favorite.addToFavorites(user,property_id,h);
        },
        options:{
            auth: 'user',
            tags: ['api','FavoritesRoutes'],
            validate: {
                params: Joi.object({
                    property_id: Joi.number().required()
                })
            }
        },
    },
    {
        method: "GET",
        path: "/getFavorites/{pageNumber}/{pageSize}",
        handler: (request, h) => {
            const {user} = request;
            const pageNumber = request.params.pageNumber || 1;
            const pageSize = request.params.pageSize || 10;
            return Favorite.getPropertyFromFavorite(user,pageNumber, pageSize, h);
        },
        options: {
            auth: 'user',
            tags: ['api','FavoritesRoutes'],
            validate: {
                params: Joi.object({
                    pageNumber: Joi.number().required(),
                    pageSize: Joi.number().required(),
                })
            }
        },
    },
    {
        method: "DELETE",
        path: "/removeFromFavorite/{property_id}",
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.property_id;
            return Favorite.removeFromFavorite(user,property_id,h);
        },
        options:{
            auth: 'user',
            tags: ['api','FavoritesRoutes'],
            validate: {
                params: Joi.object({
                    property_id: Joi.number().required()
                })
            }
        },
    }
]