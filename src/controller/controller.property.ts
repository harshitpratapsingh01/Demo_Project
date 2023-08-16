import { Property } from "../models/schema.property";
import { Validate } from "../middleware/user.validation";
import { User } from "../models/DbSchema";
import fs from "fs";
import { request } from "http";
const { Op } = require("sequelize");

export class Propertys {
    static async addProperty(user, Details, h) {
        try {
            const isUser: any = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not found" }).code(404);
            }
            const point = {
                type: 'Point',
                coordinates: [Details.longitude, Details.latitude]
            };
            const property_details = ({
                property_type: Details.property_type,
                description: Details.description,
                sqrmeter: Details.sqrmeter,
                price: Details.price,
                seller_id: isUser.id,
                house_no: Details.house_no,
                street: Details.street,
                area: Details.area,
                city: Details.city,
                state: Details.state,
                country: Details.country,
                zipCode: Details.zipCode,
                location: point
            });
            const property = await Property.create(property_details);
            console.log(property);
            if (!property) {
                return h.response("Something went wrong").code(400);
            }
            return h.response({ message: "success", property }).code(201);
        }
        catch (error) {
            return h.response("Internal Server error").code(500);
        }
    }

    static async setPropertyImages(user, request, h) {
        try {
            const isUser: any = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User Not Found" });
            }
            const isProperty: any = await Property.findOne({ where: { seller_id: isUser.id } });
            if (isProperty) {
                const files = request.files;
                const bufferDataArray = [];
                for (let file in files) {
                    const fileData = fs.readFileSync(files[file].path);
                    const bufferData = Buffer.from(fileData);
                    bufferDataArray.push(bufferData);
                }
                const property = await Property.update({ images: bufferDataArray }, { where: { [Op.and]: { seller_id: isUser.id, id: isProperty.id } } })
                if (property[0] == 0) {
                    return h.response({ message: "Something went wrong" }).code(400);
                }
                return h.response({ message: "Images added Successfully" }).code(200);
            }
        }
        catch (err) {
            return h.response({ message: "Internal Server error", err }).code(500);
        }
    }

    static async deleteProperty(user, propertyId, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ mesasge: "User Not Found" }).code(404);
            }

            const property = await Property.findByPk(propertyId);
            if (!property) {
                return h.response({ message: "No property found " }).code(404);
            }
            await property.destroy();
            return h.response({ message: "Property Deleted Successfully" }).code(200);
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }


    static async getAllPropertys(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const All_propertys = await Property.findAll();
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            return h.response({ message: "All Property's: ", All_propertys });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async searchProperty(user, details, h) {
        try {
            console.log(details);
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const property = await Property.findAll({ where: { [Op.or]: { city: details.city, area: details.area } } });
            if (!property) {
                return h.response({ message: "No property found at this location" }).code(404);
            }
            else {
                return h.response({ message: "Listed Property's are: ", property }).code(200);
            }
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }

    static async buyProperty(user, property_id, h) {
        try {
            const isUSer: any = await User.findOne({ where: { email: user.email } });
            if (!isUSer) {
                return h.response({ message: "User Not Found" }).code(404);
            }
            const buyer = await Property.update(
                { BuyerId: isUSer.id, property_status: "SOLD OUT" },
                { where: { id: property_id } });

            if (!buyer) {
                return h.response({ message: "Something Went Wrong" });
            }
            return h.response({ message: "Property Sold Successfully" });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server Error" }).code(500);
        }
    }
}




