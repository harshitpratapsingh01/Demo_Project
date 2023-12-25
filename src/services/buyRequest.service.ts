import { User } from "../models/DbSchema";
import { Property } from "../models/schema.property";
import { Buyrequest } from "../models/BuyRequest.model";
const { Op } = require("sequelize");
import { PropertyBuyRequest } from "../models/PropertyRequest.model";

export class BuyRequestService {
    static async addRequest(user, property_id) {
        const isUser: any = await User.findOne({
            where: {
                email: user.email
            }, attributes: {
                exclude: [
                    'password', 'createdAt', 'updatedAt'
                ]
            }
        });
        if (!isUser) {
            return null;
        }

        const property: any = await Property.findOne({
            where: {
                id: property_id
            }, attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            }
        });

        if (!property) {
            return "Not Found";
        }

        if (property.property_status === "SOLD OUT") {
            return "Sold Out";
        }

        const isRequested = await Buyrequest.findOne({
            where: {
                [Op.and]: {
                    user_id: isUser.id,
                    property_id: property_id
                }
            }
        });
        if (isRequested) {
            return "Already";
        }


        const requetsDetails = ({
            user_id: isUser.id,
            property_id: property_id
        })
        const requests = await Buyrequest.create(requetsDetails);
        const PropertyRequestDetails = ({
            user_id: property.seller_id,
            buyer_id: isUser.id,
            property_id: property_id
        })
        const BuyRequest = await PropertyBuyRequest.create(PropertyRequestDetails);

        return { isUser, requests, property };
    }

    static async getUserBuyHistory(user, pageNumber, pageSize) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const offset = (pageNumber - 1) * pageSize;
        const history: any = await Buyrequest.findAll({
            where: {
                user_id: isUser.id
            }, attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            },
            limit: pageSize,
            offset: offset
        });

        if (!history.length) {
            return "Not Found"
        }

        const propertyDetails = [];
        for (let i = 0; i < history.length; i++) {
            const details = await Property.findOne({
                where: {
                    id: history[i].property_id
                }, attributes: {
                    exclude: [
                        'createdAt', 'updatedAt'
                    ]
                }
            })
            propertyDetails.push({ request: history[i], PropertyDetails: details });
        }

        return propertyDetails
    }

    static async getPropertyBuyRequest(user, pageNumber, pageSize) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const offset = (pageNumber - 1) * pageSize;
        const requests: any = await PropertyBuyRequest.findAll({
            where: {
                user_id: isUser.id,
                requestStatus: {
                    [Op.not]: 'SOLD OUT'
                }
            },
            limit: pageSize,
            offset: offset
        });

        if (!requests.length) {
            return "Not Found"
        }

        const propertyDetails = [];
        for (let i = 0; i < requests.length; i++) {
            const details = await Property.findOne({
                where: {
                    id: requests[i].property_id
                }, attributes: {
                    exclude: [
                        'createdAt', 'updatedAt'
                    ]
                }

            });

            const BuyerDetails = await User.findOne({
                where: {
                    id: requests[i].buyer_id
                }, attributes: {
                    exclude: [
                        'password', 'createdAt', 'updatedAt'
                    ]
                }
            })
            propertyDetails.push({ request: requests[i], BuyerDetails: BuyerDetails, PropertyDetails: details });
        }

        return propertyDetails
    }
}