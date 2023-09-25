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
            tags: ['api','property'],
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
            const propertyId = request.params.id;
            return Propertys.setPropertyImages(user, propertyId, request, h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
            payload: {
                output: 'stream',
                maxBytes: 5000000,
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },
            validate: {
                params: Joi.object({
                    propertyId: Joi.number().required(),
                })
            }
        }
    },
    {
        method: "DELETE",
        path: "/deleteProperty/{propertyId}",
        handler: (request, h) => {
            const { user } = request;
            const propertyId = request.params.propertyId;
            return Propertys.deleteProperty(user, propertyId, h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
            validate: {
                params: Joi.object({
                    propertyId: Joi.number().required(),
                })
            }
        },
    },
    {
        method: "GET",
        path: '/getAllPropertys/{pageNumber}/{pageSize}',
        handler: (request, h) => {
            const { user } = request;
            const pageNumber = request.params.pageNumber || 1;
            const pageSize = request.params.pageSize || 10;
            return Propertys.getAllPropertys(user, pageNumber, pageSize, h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
            validate: {
                params: Joi.object({
                    pageNumber: Joi.number().required(),
                    pageSize: Joi.number().required()
                })
            }
        },
    },
    {
        method: "GET",
        path: '/getUserProperty',
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getUserPropertys(user,h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
        },
    },
    {
        method: "GET",
        path: '/getPropertyTypes/{propertyType}/{pageNumber}/{pageSize}',
        handler: (request, h) => {
            const {user} = request;
            const propertyType = request.params.propertyType;
            const pageNumber = request.params.pageNumber || 1;
            const pageSize = request.params.pageSize || 10;
            return Propertys.getPropertysByType(user, propertyType, pageNumber, pageSize, h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
            validate: {
                params: Joi.object({
                    propertyType: Joi.string().required(),
                    pageNumber: Joi.number().required(),
                    pageSize: Joi.number().required()
                })
            }
        },
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
            tags: ['api','property'],
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
        handler: (request, h) => {
            const { user } = request;
            const property_id = request.params.id;
            const BuyerId = request.params.BuyerId;
            return Propertys.buyProperty(user, property_id, BuyerId, h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
            validate: {
                params: Joi.object({
                    property_id: Joi.number().required(),
                    BuyerId: Joi.number().required()
                })
            }
        },
    },
    {
        method: "GET",
        path: "/PropertyDetails/{PropertyId}",
        handler: (request,h) => {
            const {user} = request;
            const PropertyId = request.params.PropertyId
            return Propertys.getPropertyDetails(user,PropertyId,h);
        },
        options: {
            auth: 'user',
            tags: ['api','property'],
            validate: {
                params: Joi.object({
                    PropertyId: Joi.number().required()
                })
            }
        },
    }

]

