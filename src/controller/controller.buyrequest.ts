
import { BuyRequest } from "./controller.request";
import { BuyRequestService } from "../services/buyRequest.service";

export class Request {
    static async addRequest(user, property_id, h) {
        try {
            const response = await BuyRequestService.addRequest(user, property_id)
            if (!response) {
                return h.response({ message: "User Not Found" }).code(404);
            }

            if (response === "Not Found") {
                return h.response({ message: "Property You want to Buy is Not Found" }).code(404);
            }

            if (response === "Sold Out") {
                return h.response({ message: "Property You want to Buy is SOLD OUT" }).code(404);
            }

            if (response === "Already") {
                return h.response({ message: "Already Requested" });
                // return h.redirect('/message6')
            }

            await BuyRequest.property_buy_request(response.isUser, property_id);

            return h.response({
                success: true, message: "Your Buy Request Successfully Sent to Owner",
                BuyRequest: response.requests,
                Buyer: response.isUser,
                property: response.property
            }).code(200);

            // const queryParams = new URLSearchParams({ isUser: JSON.stringify(isUser) });
            // return h.redirect('/message3?' + queryParams.toString());
        }
        catch (error) {
            console.log(error);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }

    static async getUserBuyHistory(user, pageNumber, pageSize, h) {
        try {
            const response = await BuyRequestService.getUserBuyHistory(user, pageNumber, pageSize);
            if (!response) {
                return h.response({ message: "User Not Found" }).code(404);
            }

            if (response === "Not Found") {
                return h.response({ message: "No Buy History found" }).code(404);
            }

            return h.response({ message: "Property's Buy History are: ", response });
            // return h.view('property-history', { user: isUser, property: propertyDetails, request: requests });
        }
        catch (err) {
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }

    static async getPropertyBuyRequest(user,pageNumber,pageSize,h) {
        try{
            const response = await BuyRequestService.getPropertyBuyRequest(user,pageNumber,pageSize);
            if(!response){
                return h.response({ message: "User Not Found" }).code(404);
            }
            if (response === "Not Found") {
                return h.response({ message: "No Buy Request found" }).code(404);
            }
    
            return h.response({ message: "Your Property's Buy Requests are: ", response });
        }
        catch(err){
            console.log(err);
            return h.response({ message: "Internal Server Error" }).code(500);
        }
    }
}
