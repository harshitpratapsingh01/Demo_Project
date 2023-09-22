import { User } from "../models/DbSchema";
import { Property } from "../models/schema.property";
import fs from "fs";
import { Op } from "sequelize";
import { Buyrequest } from "../models/BuyRequest.model";
import { PropertyBuyRequest } from "../models/PropertyRequest.model";

export class PropertyService {
    static async addProperty(user, data) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return "Not Found"
        }

        // const point = {
        //     type: 'Point',
        //     coordinates: [Details.longitude, Details.latitude]
        // };

        const property_details = ({
            property_type: data.property_type,
            description: data.description,
            sqrmeter: data.sqrmeter,
            price: data.price,
            seller_id: isUser.id,
            bed: data.bed,
            bath: data.bath,
            featured: data.featured,
            house_no: data.house_no,
            street: data.street,
            area: data.area,
            city: data.city,
            state: data.state,
            country: data.country,
            zipCode: data.zipCode,
            // location: point
        });
        const property = await Property.create(property_details);
        if (!property) {
            return null
        }
        return property
    }

    static async addPropertyImages(user, data, propertyId) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return "User Error";
        }
        const name = [];
        for (let i = 0; i < data.file.length; i++) {
            const image_name = data.file[i].hapi.filename;
            name.push(image_name);
            const path = `${process.cwd()}/real-estate-html-template/img/` + name;
            const file = fs.createWriteStream(path);
            data.file[i].pipe(file);
        }

        const property = await Property.update({ images: name }, { where: { [Op.and]: { seller_id: isUser.id, id: propertyId } } });
        if (!property) {
            return null;
        }
        return property;
    }

    static async deleteProperty(user, propertyId) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const property = await Property.findOne({ where: { [Op.and]: { seller_id: isUser.id, id: propertyId } } });
        if (!property) {
            return "Not Found"
        }
        await property.destroy();
        return true;
    }

    static async getAllProperty(user, pageNumber, pageSize) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }
        const offset = (pageNumber - 1) * pageSize;
        const All_properties = await Property.findAll({
            where: {
                seller_id: {
                    [Op.ne]: isUser.id
                }
            },
            limit: pageSize,
            offset: offset
        });
        if (!All_properties.length) {
            return "Not Found";
        }
        return All_properties
    }

    static async getUserProperty(user) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }
        const All_propertys = await Property.findAll({ where: { seller_id: isUser.id } });
        if (!All_propertys.length) {
            return "Not Found"
        }
        return All_propertys;
    }

    static async getPropertyByTypes(user, propertyTypes, pageNumber, pageSize) {
        const isUser = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }
        const offset = (pageNumber - 1) * pageSize;
        const All_propertys = await Property.findAll({
            where:
                { property_type: propertyTypes },
            limit: pageSize,
            offset: offset
        });
        if (!All_propertys.length) {
            return "Not Found"
        }
        return All_propertys;
    }

    static async searchProperty(user, data) {
        const isUser = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const property = await Property.findAll({
            where: {
                [Op.and]: {
                    city: data.city,
                    featured: data.featured,
                    property_type: data.property_type
                }
            }
        });
        if (!property.length) {
            return "Not Found";
        }

        return property
    }

    static async propertyDetails(user, propertyId) {
        const isUser = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const property: any = await Property.findOne({ where: { id: propertyId } });

        if (!property) {
            return "Not Found"
        }

        const owner = await User.findOne({
            where: {
                id: property.seller_id
            }, attributes: {
                exclude: [
                    'id', 'password', 'createdAt', 'updatedAt'
                ]
            }
        });

        return { property, owner };
    }

    static async buyProperty(user, property_id, BuyerId) {
        const isUser: any = await User.findOne({ where: { email: user.email } });
        if (!isUser) {
            return null;
        }

        const property = await Property.findOne({
            where: {
                id: property_id
            }, attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            }
        });

        if(!property){
            return "Not Found"
        }

        const Buyer = await User.findOne({
            where: {
                id: BuyerId 
            }, attributes: {
                exclude: [
                    'password', 'createdAt', 'updatedAt'
                ]
            }
        })

        const UpdateBuyer = await Property.update(
            { BuyerId: BuyerId, property_status: "SOLD OUT" },
            { where: { id: property_id } }
        );

        const HistoryStatus = await Buyrequest.update(
            { requestStatus: "SOLD OUT" },
            { where: { property_id: property_id } }
        );

        const buyRequestStatus = await PropertyBuyRequest.update(
            { requestStatus: "SOLD OUT" },
            { where: { property_id: property_id } }
        );

        const propertyDetails = await Property.findOne({
            where: {
                id: property_id
            }, attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            }
        });

        return { Buyer, propertyDetails };
    }
}