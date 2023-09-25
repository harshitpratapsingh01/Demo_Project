import { PropertyService } from "../services/property.service";

export class Propertys {
    static async addProperty(user, Details, h) {
        try {
            const response = await PropertyService.addProperty(user,Details);
            if (response === "Not Found") {
                return h.response({ message: "User not found" }).code(404);
            }

            if(!response){
                return h.response("Error In Adding Property").code(401);
            }
            // const status = await Redis.isActiv(isUser);
            // if (!status) {
            //     return h.response({ message: "Please Login First" }).code(400);
            //     // return h.view('message2');
            // }
            return h.response({ message: "success", response }).code(201);
            // const queryParams = new URLSearchParams({ property: JSON.stringify(property) });
            // return h.redirect('/PropertyImages?' + queryParams.toString());
        }
        catch (error) {
            console.log(error);
            return h.response("Internal Server error").code(500);
        }
    }

    static async setPropertyImages(user, propertyId, request, h) {
        try {
            const data: any = request.payload;

            if (!data.file) {
                return h.response({ message: "No file provided" }).code(400);
            }
            
            const response = await PropertyService.addPropertyImages(user,data,propertyId);
            if(response === "User Error"){
                return h.response({ message: "User Not Found" }).code(404);
            }

            return new Promise((resolve, reject) => {
                if (!response) {
                    return reject(h.response({ message: "Error Uploading Property Images" }).code(500));
                }
                return resolve(h.response({ message: "Property images uploaded successfully", response }).code(200));
            });

            // return new Promise((resolve, reject) => {
            //     file.on('finish', async () => {
            //         try {
            //             const property = await Property.update({ images: [name] }, { where: { [Op.and]: { seller_id: isUser.id, id: propertyId } } });
            //             resolve(h.response({ message: "Images uploaded successfully" }).code(200));
            //             // const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
            //             // resolve(h.redirect('/message1?' + queryParams.toString()));
            //         } catch (err) {
            //             console.error(err);
            //             reject(h.response({ message: "Error updating profilePic" }).code(500));
            //         }
            //     });

            //     file.on('error', (err) => {
            //         console.error(err);
            //         reject(h.response({ message: "Error writing file" }).code(500));
            //     });
            // });
        } catch (err) {
            console.log(err);
            return h.response({ message: "Error" }).code(500);
        }
    }

    static async deleteProperty(user, propertyId, h) {
        try {
            const response = await PropertyService.deleteProperty(user,propertyId);
            if(!response){
                return h.response({ mesasge: "User Not Found" }).code(404);
            }

            if (response === "Not Found") {
                return h.response({ message: "No property found " }).code(404);
            }

            return h.response({ success: true, message: "Property Deleted Successfully" }).code(200);
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }


    static async getAllPropertys(user, pageNumber, pageSize, h) {
        try {
            const response = await PropertyService.getAllProperty(user,pageNumber,pageSize);
            if (!response) {
                return h.response({ message: "User not Found" }).code(404);
            }
            if (response === "Not Found") {
                return h.response({ message: "No property Found" }).code(404);
            }
            // if (!status) {
            //     return h.view('property-list1', { property: All_properties });
            // }
            return h.response({ message: "All Property's: ", response });
            // return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getUserPropertys(user, h) {
        try {
            const response = await PropertyService.getUserProperty(user);
            if (!response) {
                return h.response({ message: "User not Found" }).code(404);
            }
            
            // if (!status) {
            //     return h.response({ message: "Please Login First" }).code(400);
            //     // return h.view('message2');
            // }

            if(response === "Not Found"){
                return h.response({ message: "No property Found" }).code(404);
            }
            return h.response({ message: "All Property's: ", response });
            // return h.view('property', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    static async getPropertysByType(user, propertyType, pageNumber, pageSize, h) {
        try {
            const response = await PropertyService.getPropertyByTypes(user,propertyType,pageNumber,pageSize);
            if (!response) {
                return h.response({ message: "User not Found" }).code(404);
            }
            if (response === "Not Found") {
                return h.response({ message: "No property Found" }).code(404);
            }
            return h.response({ message: "All Property's: ", response });
            // if (!status) {
            //     return h.view('property-list1', { property: All_propertys });
            // }
            // return h.view('property-list', { property: All_propertys, user: isUser });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server error" }).code(500);
        }
    }

    // static async getPropertysByType2(user, h) {
    //     try {
    //         const isUser = await User.findOne({ where: { email: user.email } });
    //         if (!isUser) {
    //             return h.response({ message: "User not Found" }).code(404);
    //         }
    //         const status = await Redis.isActiv(isUser);
    //         const All_propertys = await Property.findAll({ where: { property_type: "Villa" } });
    //         if (!All_propertys) {
    //             return h.response({ message: "No property Found" }).code(404);
    //         }
    //         return h.response({ message: "All Property's: ", All_propertys });
    //     //     if (!status) {
    //     //         return h.view('property-list1', { property: All_propertys });
    //     //     }
    //     //     return h.view('property-list', { property: All_propertys, user: isUser });
    //     }
    //     catch (err) {
    //         console.log(err);
    //         return h.response({ message: "Internal server error" }).code(500);
    //     }
    // }

    // static async getPropertysByType3(user, h) {
    //     try {
    //         const isUser = await User.findOne({ where: { email: user.email } });
    //         if (!isUser) {
    //             return h.response({ message: "User not Found" }).code(404);
    //         }
    //         const status = await Redis.isActiv(isUser);
    //         const All_propertys = await Property.findAll({ where: { property_type: "Home" } });
    //         if (!All_propertys) {
    //             return h.response({ message: "No property Found" }).code(404);
    //         }
    //         // return h.response({ message: "All Property's: ", All_propertys });
    //         // if (!status) {
    //         //     return h.view('property-list1', { property: All_propertys });
    //         // }
    //         // return h.view('property-list', { property: All_propertys, user: isUser });
    //     }
    //     catch (err) {
    //         console.log(err);
    //         return h.response({ message: "Internal server error" }).code(500);
    //     }
    // }

    // static async getPropertysByType4(user, h) {
    //     try {
    //         const isUser = await User.findOne({ where: { email: user.email } });
    //         if (!isUser) {
    //             return h.response({ message: "User not Found" }).code(404);
    //         }
    //         const status = await Redis.isActiv(isUser);
    //         const All_propertys = await Property.findAll({ where: { property_type: "Office" } });
    //         if (!All_propertys) {
    //             return h.response({ message: "No property Found" }).code(404);
    //         }
    //         // return h.response({ message: "All Property's: ", All_propertys });
    //         // if (!status) {
    //         //     return h.view('property-list1', { property: All_propertys });
    //         // }
    //         // return h.view('property-list', { property: All_propertys, user: isUser });
    //     }
    //     catch (err) {
    //         console.log(err);
    //         return h.response({ message: "Internal server error" }).code(500);
    //     }
    // }

    // static async getPropertysByType5(user, h) {
    //     try {
    //         const isUser = await User.findOne({ where: { email: user.email } });
    //         if (!isUser) {
    //             return h.response({ message: "User not Found" }).code(404);
    //         }
    //         const status = await Redis.isActiv(isUser);
    //         const All_propertys = await Property.findAll({ where: { property_type: "Shop" } });
    //         if (!All_propertys) {
    //             return h.response({ message: "No property Found" }).code(404);
    //         }
    //         // return h.response({ message: "All Property's: ", All_propertys });
    //         // if (!status) {
    //         //     return h.view('property-list1', { property: All_propertys });
    //         // }
    //         // return h.view('property-list', { property: All_propertys, user: isUser });
    //     }
    //     catch (err) {
    //         console.log(err);
    //         return h.response({ message: "Internal server error" }).code(500);
    //     }
    // }

    static async searchProperty(user, details, h) {
        try {
            const response = await PropertyService.searchProperty(user,details);
            if (!response) {
                return h.response({ message: "User not Found" }).code(404);
            }

            // if (!status) {
            //     return h.response({ message: "Please Login First" }).code(400);
            //     // return h.view('message2');
            // }

            if (response === "Not Found") {
                return h.response({ message: "No property found at this location" }).code(404);
            }

            return h.response({ message: "Listed Property's are: ", response }).code(200);
                // const queryParams = new URLSearchParams({ property: JSON.stringify(property) });
                // const queryParams1 = new URLSearchParams({ isUser: JSON.stringify(isUser) })
                // return h.redirect('/PropertyImages?' + queryParams.toString());
                // return h.redirect('/property-list1?' + queryParams.toString() + '&' + queryParams1.toString())
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }

    static async buyProperty(user, property_id, BuyerId, h) {
        try {
            const response = await PropertyService.buyProperty(user,property_id, BuyerId);
            if (!response) {
                return h.response({ message: "User Not Found" }).code(404);
            }
            // if (!status) {
            //     return h.response({ message: "Please Login First" }).code(400);
            //     // return h.view('message2');
            // }

            if (response === "Not Found") {
                return h.response({ message: "The Property you want to sell is Not Found" });
            }
            // return h.view('message3', {user: isUser});
            // await BuyRequest.property_buy_request(isUser, property_id);
            return h.response({ message: "Property Sold Out Successfully" , response});

            // const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
            // return h.redirect('/message8?' + queryParams.toString());
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal server Error" }).code(500);
        }
    }

    static async getPropertyDetails(user, propertyId, h) {
        try {
            const response = await PropertyService.propertyDetails(user,propertyId);
            if (!response) {
                return h.response({ message: "User not Found" }).code(404);
            }

            // if (!status) {
            //     return h.response({ message: "Please Login First" }).code(400);
            //     // return h.view('message2');
            // }

            if(response === "Not Found"){
                return h.response({message: "No Property Found"}).code(404);
            }

            return h.response({message: "PropertyDetails", Property: response.property, Owner: response.owner});

            // return h.view('displayPropertyDetails', { PropertyDetails: property, user: isUser, owner: owner })
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }
}

