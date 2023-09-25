import { Request } from "../controller/controller.buyrequest";
import Joi from "joi";

export const MakeRequest = [
    {
        method: "POST",
        path: "/buyRequets/{property_id}",
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.property_id;
            return Request.addRequest(user,property_id,h);
        },
        options: {
            auth : "user",
            tags: ['api','Buy Request'],
            validate: {
                params: Joi.object({
                    property_id: Joi.number().required()
                })
            }
        },
    },
    {
        method: "GET",
        path: "/getBuyHistory/{pageNumber}/{pageSize}",
        handler: (request,h) => {
            const {user} = request;
            const pageNumber = request.params.pageNumber || 1;
            const pageSize = request.params.pageSize || 10;
            return Request.getUserBuyHistory(user,pageNumber,pageSize,h);
        },
        options: {
            auth: "user",
            tags: ['api','Buy Request'],
            validate: {
                params: Joi.object({
                    pageNumber: Joi.number().required(),
                    pageSize: Joi.number().required(),
                })
            }
        },
    },
    {
        method: "GET",
        path: "/getBuyRequests/{pageNumber}/{pageSize}",
        handler: (request,h) => {
            const {user} = request;
            const pageNumber = request.params.pageNumber || 1;
            const pageSize = request.params.pageSize || 10;
            return Request.getPropertyBuyRequest(user,pageNumber,pageSize,h);
        },
        options: {
            auth: "user",
            tags: ['api','Buy Request'],
            validate: {
                params: Joi.object({
                    pageNumber: Joi.number().required(),
                    pageSize: Joi.number().required(),
                })
            }
        },
    },
]