import { Property } from "../models/schema.property";
import { Validate } from "../middleware/user.validation";
import { User } from "../models/DbSchema";
import fs from "fs";
const { Op } = require("sequelize");

export class Propertys {
    static async addProperty(request: any, h) {
        try {
            const user = await Validate.verify_token(request.headers.authorization);
            const isUser: any = await User.findOne({ where: { email: user.email } });
            if (!isUser) {
                return h.response({ message: "User not found" }).code(404);
            }
            const Details = request.payload;
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

    static async setPropertyImages(request, h) {
        try {
            const user = await Validate.verify_token(request.headers.authorization);
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
                if(property[0]==0){
                    return h.response({message: "Something went wrong"}).code(400);
                }
                return h.response({message: "Images added Successfully"}).code(200);
            }
        }
        catch (err) {
            return h.response({ message: "Internal Server error", err }).code(500);
        }
    }
}




