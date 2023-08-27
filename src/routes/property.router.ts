import { Propertys } from "../controller/controller.property";
import upload from "../middleware/imageUploader/image.uploader";
export const PropertyRoutes = [
    {
        method: "POST",
        path: "/addproperty",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            const Details = request.payload
            return Propertys.addProperty(user, Details, h);
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
        path: '/getAllPropertys',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            return Propertys.getAllPropertys(user, h);
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
        path: '/getPropertyTypes1',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getPropertysByType1(user, h);
        }
    },
    {
        method: "GET",
        path: '/getPropertyTypes2',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getPropertysByType2(user, h);
        }
    },
    {
        method: "GET",
        path: '/getPropertyTypes3',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getPropertysByType3(user, h);
        }
    },
    {
        method: "GET",
        path: '/getPropertyTypes4',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getPropertysByType4(user, h);
        }
    },
    {
        method: "GET",
        path: '/getPropertyTypes5',
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
            return Propertys.getPropertysByType5(user, h);
        }
    },
    {
        method: "POST",
        path: "/searchProperty",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            const details = request.payload;
            return Propertys.searchProperty(user, details, h);
        }
    },

    {
        method: "GET",
        path: "/addBuyer/{id}",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            const property_id = request.params.id;
            return Propertys.buyProperty(user, property_id, h);
        }
    },
    {
        method: "GET",
        path: "/PropertyDetails",
        options: {
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const property = JSON.parse(request.query.property);
            return Propertys.getPropertyDetails(user,property,h);
        }
    }

]

