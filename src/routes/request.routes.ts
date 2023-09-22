import { Request } from "../controller/controller.buyrequest";

export const MakeRequest = [
    {
        method: "POST",
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
        path: "/getBuyHistory/{pageNumber}/{pageSize}",
        options: {
            auth: "user"
        },
        handler: (request,h) => {
            const {user} = request;
            return Request.getUserBuyHistory(user,request,h);
        }
    },
    {
        method: "GET",
        path: "/getBuyRequests/{pageNumber}/{pageSize}",
        options: {
            auth: "user"
        },
        handler: (request,h) => {
            const {user} = request;
            return Request.getPropertyBuyRequest(user,request,h);
        }
    },
]