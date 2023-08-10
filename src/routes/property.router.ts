import { Propertys } from "../controller/controller.property";

export const PropertyRoutes = [
    {
        method: "POST",
        path: "/addproperty",
        handler: (request,h) => {
            return Propertys.addProperty(request,h);
        }
    }
]

