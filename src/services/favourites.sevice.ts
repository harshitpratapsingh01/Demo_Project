import { Favorites } from "../models/user.favourites";
import { Property } from "../models/schema.property";
import { User } from "../models/DbSchema";
const { Op } = require("sequelize");

export class FavoriteService {
    static async addToFavorites(user, property_id) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const isPresent = await Favorites.findOne({
            where: {
                [Op.and]: {
                    user_id: isUser.id,
                    property_id: property_id
                }
            }
        });
        if (isPresent) {
            return "Already"
        }

        const property = await Property.findOne({
            where: {
                id: property_id
            }, attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            }
        })

        if (!property) {
            return "Not Found";
        }

        const favorite_details = ({
            property_id: property_id,
            user_id: isUser.id
        })
        const favorites = await Favorites.create(favorite_details);
        return { favorites, property };
    }

    static async getPropertyFromFavorite(user, pageNumber, pageSize) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const offset = (pageNumber - 1) * pageSize;
        const propertys: any = await Favorites.findAll({
            where: {
                user_id: isUser.id
            },attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            },
            limit: pageSize,
            offset: offset
        });
        if (!propertys) {
            return "Not Found"
        }

        const propertyDetails = [];
        for (let i = 0; i < propertys.length; i++) {
            const details = await Property.findOne({
                where: {
                    id: propertys[i].property_id
                }, attributes: {
                    exclude: [
                        'createdAt', 'updatedAt'
                    ]
                }
            })
            propertyDetails.push({FavouritedProperty:propertys[i], PropertyDetail: details});
        }

        return propertyDetails;
    }

    static async removeFromFavorite(user, property_id) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }
        const isProperty = await Favorites.findOne({
            where: {
                [Op.and]: {
                    user_id: isUser.id,
                    property_id: property_id
                }
            }
        });
        if (!isProperty) {
            return "Not Found"
        }
        await isProperty.destroy();
        return true;
    }
}