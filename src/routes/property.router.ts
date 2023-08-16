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
        path: "/propertyImages",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const { user } = request;
            const file = upload.array('images', 10);
            return Propertys.setPropertyImages(user, request, h);
        }
    },
    {
        method: "DELETE",
        path: "/deleteProperty/{id}",
        options: {
            auth: 'user'
        },
        handler: (request, h) => {
            const {user} = request;
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
            const {user} = request;
            return Propertys.getAllPropertys(user,h);
        }
    },
    {
        method: "POST",
        path: "/searchProperty",
        options: {
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const details = request.payload;
            return Propertys.searchProperty(user,details,h);
        }
    },

    {
        method: "POST",
        path: "/addBuyer/{id}",
        options: {
            auth: 'user'
        },
        handler: (request,h) => {
            const {user} = request;
            const property_id = request.params.id;
            return Propertys.buyProperty(user,property_id,h);
        }
    }

]

