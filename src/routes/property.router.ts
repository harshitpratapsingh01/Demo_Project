import { Propertys } from "../controller/controller.property";
import Joi from "joi"

export const PropertyRoutes = [
    {
        method: "POST",
        path: "/addproperty",
        handler: (request, h) => {
            const { user } = request;
            const Details = request.payload
            return Propertys.addProperty(user, Details, h);
        },
        options: {
            auth: "user",
            validate: {
                payload: Joi.object({
                    property_type: Joi.string().required(),
                    description: Joi.string().required(),
                    sqrmeter: Joi.number().min(100).max(20000).required(),
                    price: Joi.number().required(),
                    bed: Joi.number().min(1).max(6).required(),
                    bath: Joi.number().min(1).max(5).required(),
                    featured: Joi.string().required(),
                    house_no: Joi.string().required(),
                    street: Joi.string().required(),
                    area: Joi.string().required(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    country: Joi.string().required(),
                    zipCode: Joi.number().required(),
                })
            }
        }
    },
    {
        method: "POST",
        path: "/propertyImages/{id}",
        handler: (request, h) => {
            const { user } = request
            return Propertys.setPropertyImages(user, request, h);
        },
        options: {
            auth: 'user',
            payload: {
                output: 'stream',
                maxBytes: 5000000,
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    },
    {
        method: "DELETE",
        path: "/deleteProperty/{id}",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            const propertyId = request.params.id;
            return Propertys.deleteProperty(user, propertyId, h);
        }
    },
    {
        method: "GET",
        path: '/getAllPropertys/{pageNumber}/{pageSize}',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            return Propertys.getAllPropertys(user, request, h);
        }
    },
    {
        method: "GET",
        path: '/getUserProperty',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getUserPropertys(user,h);
        }
    },
    {
        method: "GET",
        path: '/getPropertyTypes/{propertyType}/{pageNumber}/{pageSize}',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getPropertysByType(user,request, h);
        }
    },
    // {
    //     method: "GET",
    //     path: '/getPropertyTypes2',
    //     options: {
    //         auth: 'user'
    //     },
    //     handler: (request, h) => {
    //         const {user} = request;
    //         return Propertys.getPropertysByType2(user, h);
    //     }
    // },
    // {
    //     method: "GET",
    //     path: '/getPropertyTypes3',
    //     options: {
    //         auth: 'user'
    //     },
    //     handler: (request, h) => {
    //         const {user} = request;
    //         return Propertys.getPropertysByType3(user, h);
    //     }
    // },
    // {
    //     method: "GET",
    //     path: '/getPropertyTypes4',
    //     options: {
    //         auth: 'user'
    //     },
    //     handler: (request, h) => {
    //         const {user} = request;
    //         return Propertys.getPropertysByType4(user, h);
    //     }
    // },
    // {
    //     method: "GET",
    //     path: '/getPropertyTypes5',
    //     options: {
    //         auth: 'user'
    //     },
    //     handler: (request, h) => {
    //         const {user} = request;
    //         return Propertys.getPropertysByType5(user, h);
    //     }
    // },
    {
        method: "POST",
        path: "/searchProperty",
        handler: (request, h) => {
            const { user } = request;
            const details = request.payload;
            return Propertys.searchProperty(user, details, h);
        },
        options: {
            auth: 'user',
            validate: {
                payload: Joi.object({
                    city: Joi.string().required(),
                    featured: Joi.string().required(),
                    property_type: Joi.string().required(),
                })
            }
        },
    },

    {
        method: "POST",
        path: "/addBuyer/{id}/{BuyerId}",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            const property_id = request.params.id;
            const BuyerId = request.params.BuyerId;
            return Propertys.buyProperty(user, property_id, BuyerId, h);
        }
    },
    {
        method: "GET",
        path: "/PropertyDetails/{PropertyId}",
        options: {
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const propertyId = request.params.PropertyId
            return Propertys.getPropertyDetails(user,propertyId,h);
        }
    }

]

