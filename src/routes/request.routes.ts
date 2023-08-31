import { Request } from "../controller/controller.buyrequest";

export const MakeRequest = [
    {
        method: "GET",
        path: "/buyRequets/{id}",
        options: {
            auth : "user"
        },
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.id;
            return Request.addRequest(user,property_id,h);
        }
    },
    {
        method: "GET",
        path: "/getBuyHistory",
        options: {
            auth: "user"
        },
        handler: (request,h) => {
            const {user} = request;
            return Request.getUserBuyHistory(user,h);
        }
    }
]