import { Property } from "../models/schema.property";
import { Validate } from "../middleware/user.validation";
import { User } from "../models/DbSchema";
import fs from "fs";
import { request } from "http";
import { Redis } from "../middleware/redis/redis.session";
const { Op } = require("sequelize");
import { BuyRequest } from "./controller.request";
import { Buyrequest } from "../models/BuyRequest.model";

export class Propertys {
    static async addProperty(user, Details, h) {
        try {
            const isUser: any = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            if (!status) {
                // return h.response({ message: "Please Login First" }).code(400);
                return h.view('message2');
            }


            // const point = {
            //     type: 'Point',
            //     coordinates: [Details.longitude, Details.latitude]
            // };
            const property_details = ({
                property_type: Details.property_type,
                description: Details.description,
                sqrmeter: Details.sqrmeter,
                price: Details.price,
                seller_id: isUser.id,
                bed: Details.bed,
                bath: Details.bath,
                featured: Details.featured,
                house_no: Details.house_no,
                street: Details.street,
                area: Details.area,
                city: Details.city,
                state: Details.state,
                country: Details.country,
                zipCode: Details.zipCode,
                // location: point
            });
            const property = await Property.create(property_details);
            console.log(property);
            if (!property) {
                return h.response("Something went wrong").code(400);
            }
            // return h.response({ message: "success", property }).code(201);
            const queryParams = new URLSearchParams({ property: JSON.stringify(property) });
            return h.redirect('/PropertyImages?' + queryParams.toString());
        }
        catch (error) {
            console.log(error);
            return h.response("Internal Server error").code(500);
        }
    }

    static async setPropertyImages(user, request, h) {
        try {
            if (!user) {
                return h.response({ message: "User Not Found" }).code(404);
            }

            const isUser: any = await User.findOne({ where: { email: user.email } });
            const propertyId = request.params.id;
            const data: any = request.payload;

            if (!data.file) {
                return h.response({ message: "No file provided" }).code(400);
            }
            const name = data.file.hapi.filename;
            const path = `${process.cwd()}/real-estate-html-template/img/` + name;
            const file = fs.createWriteStream(path);
            data.file.pipe(file);

            return new Promise((resolve, reject) => {
                file.on('finish', async () => {
                    try {
                        const property = await Property.update({ images: [name] }, { where: { [Op.and]: { seller_id: isUser.id, id: propertyId } } });
                        // resolve(h.response({ message: "Images uploaded successfully" }).code(200));
                        const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
                        resolve(h.redirect('/message1?' + queryParams.toString()));
                    } catch (err) {
                        console.error(err);
                        reject(h.response({ message: "Error updating profilePic" }).code(500));
                    }
                });

                file.on('error', (err) => {
                    console.error(err);
                    reject(h.response({ message: "Error writing file" }).code(500));
                });
            });
        } catch (err) {
            console.log(err);
            return h.response({ message: "Error" }).code(500);
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
            const status = await Redis.isActiv(isUser);
            const All_propertys = await Property.findAll();
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            if (!status) {
                return h.view('property-list1', { property: All_propertys });
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getUserPropertys(user, h) {
        try {
            const isUser: any = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            if (!status) {
                // return h.response({ message: "Please Login First" }).code(400);
                return h.view('message2');
            }
            const All_propertys = await Property.findAll({ where: { seller_id: isUser.id } });
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            return h.view('property', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getPropertysByType1(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            const All_propertys = await Property.findAll({ where: { property_type: "Apartment" } });
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            if (!status) {
                return h.view('property-list1', { property: All_propertys });
            }
            return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getPropertysByType2(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            const All_propertys = await Property.findAll({ where: { property_type: "Villa" } });
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            if (!status) {
                return h.view('property-list1', { property: All_propertys });
            }
            return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getPropertysByType3(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            const All_propertys = await Property.findAll({ where: { property_type: "Home" } });
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            if (!status) {
                return h.view('property-list1', { property: All_propertys });
            }
            return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getPropertysByType4(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            const All_propertys = await Property.findAll({ where: { property_type: "Office" } });
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            if (!status) {
                return h.view('property-list1', { property: All_propertys });
            }
            return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getPropertysByType5(user, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }
            const status = await Redis.isActiv(isUser);
            const All_propertys = await Property.findAll({ where: { property_type: "Shop" } });
            if (!All_propertys) {
                return h.response({ message: "No property Found" }).code(404);
            }
            // return h.response({ message: "All Property's: ", All_propertys });
            if (!status) {
                return h.view('property-list1', { property: All_propertys });
            }
            return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async searchProperty(user, details, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }

            const status = await Redis.isActiv(isUser);
            if (!status) {
                // return h.response({ message: "Please Login First" }).code(400);
                return h.view('message2');
            }

            const property = await Property.findAll({ where: { [Op.and]: { city: details.city, featured: details.featured, property_type: details.property_type } } });
            if (!property) {
                return h.response({ message: "No property found at this location" }).code(404);
            }
            else {
                // return h.response({ message: "Listed Property's are: ", property }).code(200);
                const queryParams = new URLSearchParams({ property: JSON.stringify(property) });
                const queryParams1 = new URLSearchParams({ isUser: JSON.stringify(isUser) })
                // return h.redirect('/PropertyImages?' + queryParams.toString());
                return h.redirect('/property-list1?' + queryParams.toString() + '&' + queryParams1.toString())
            }
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }

    static async buyProperty(user, property_id, h) {
        try {
            const isUser: any = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User Not Found" }).code(404);
            }
            // const status = await Redis.isActiv(isUser);
            // if (!status) {
            //     // return h.response({ message: "Please Login First" }).code(400);
            //     return h.view('message2');
            // }


            const buyer = await Property.update(
                { BuyerId: isUser.id, property_status: "SOLD OUT" },
                { where: { id: property_id } });

            const requestStatus = await Buyrequest.update({ requestStatus: "SOLD OUT" }, { where: { property_id: property_id } })
            if (!buyer) {
                return h.response({ message: "Something Went Wrong" });
            }
            // return h.response({ message: "Property Sold Successfully" });
            // return h.view('message3', {user: isUser});
            // await BuyRequest.property_buy_request(isUser, property_id);

            const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
            return h.redirect('/message8?' + queryParams.toString());
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server Error" }).code(500);
        }
    }

    static async getPropertyDetails(user, property, h) {
        try {
            const isUser = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not Found" }).code(404);
            }

            const status = await Redis.isActiv(isUser);
            if (!status) {
                // return h.response({ message: "Please Login First" }).code(400);
                return h.view('message2');
            }
            const owner = await User.findOne({ where: { id: property.seller_id } });

            return h.view('displayPropertyDetails', { PropertyDetails: property, user: isUser, owner: owner })
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }
}

