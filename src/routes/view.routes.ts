import Hapi from "@hapi/hapi"
import path from "path";

export const ViewRoutes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.view('index');
        }
    },
    {
        method: 'GET',
        path: '/home',
        handler: (request, h) => {
            try {
                const isUser = JSON.parse(request.query.isUser);
                if (isUser) {
                    return h.view('home', { user: isUser });
                }
                return h.view('home');
            } catch (err) {
                console.error(err);
                return h.view('home');
            }
        }
    },
    {
        method: "GET",
        path: '/signUp',
        handler: (request, h) => {
            return h.view('signUp');
        }
    },
    {
        method: "GET",
        path: '/login',
        handler: (request, h) => {
            return h.view('login');
        }
    },
    {
        method: "GET",
        path: "/forgotPass",
        handler: (request, h) => {
            return h.view('forgotPass');
        }
    },
    {
        method: "GET",
        path: "/resetPass",
        handler: (request, h) => {
            return h.view('resetPass');
        }
    },
    {
        method: "GET",
        path: "/property-list",
        handler: (request, h) => {
            const isUser = JSON.parse(request.query.isUser);
            return h.view('property-list', {user: isUser});
        }
    },
    {
        method: "GET",
        path: "/property-type",
        handler: (request, h) => {
            const isUser = JSON.parse(request.query.isUser);
            return h.view('property-type', {user: isUser});
        }
    },
    {
        method: "GET",
        path: "/about",
        handler: (request, h) => {
            const isUser = JSON.parse(request.query.isUser);
            return h.view('about', {user: isUser});
        }
    },
    {
        method: "GET",
        path: "/contact",
        handler: (request, h) => {
            const isUser = JSON.parse(request.query.isUser);
            return h.view('contact', {user: isUser});
        }
    },
    {
        method: "GET",
        path: '/addProperty',
        handler: (request,h) => {
            return h.view('addProperty');
        }
    },
    {
        method: "GET",
        path: '/PropertyImages',
        handler: (request,h) => {
            try {
                const propertyDetails = JSON.parse(request.query.property);
                if (propertyDetails) {
                    return h.view('PropertyImages', { property: propertyDetails });
                }
                return h.view('PropertyImages');
            } catch (err) {
                console.error(err);
                return h.view('PropertyImages');
            }
        }
    },
    {
        method: "GET",
        path: "/property-list1",
        handler: (request, h) => {
            try {
                const isUser = JSON.parse(request.query.isUser);
                const propertyDetails = JSON.parse(request.query.property);
                console.log(propertyDetails);
                if (propertyDetails) {
                    return h.view('property-list', { property: propertyDetails, user: isUser });
                }
                return h.view('property-list');
            } catch (err) {
                console.error(err);
                return h.view('property-list');
            }
        }
    },
    {
        method: "GET",
        path: "/message",
        handler: (request,h) => {
            return h.view('message');
        }
    },
    {
        method: "GET",
        path: "/message1",
        handler: (request,h) => {
            try {
                const isUser = JSON.parse(request.query.isUser);
                if (isUser) {
                    return h.view('message1', { user: isUser });
                }
                return h.view('message1');
            } catch (err) {
                console.error(err);
                return h.view('message1');
            }
        }
    },
    {
        method: "GET",
        path: "/about1",
        handler: (request,h) => {
            return h.view('about1');
        }
    },
    {
        method: "GET",
        path: "/contact1",
        handler: (request,h) => {
            return h.view('contact1');
        }
    },
    {
        method: "GET",
        path: "/property-type1",
        handler: (request,h) => {
            return h.view('property-type1');
        }
    },
    {
        method: "GET",
        path: "/message2",
        handler: (request,h) => {
            return h.view('message2');
        }
    },
    {
        method: "GET",
        path: "/message3",
        handler: (request,h) => {
            try {
                const isUser = JSON.parse(request.query.isUser);
                if (isUser) {
                    return h.view('message3', { user: isUser });
                }
                return h.view('message3');
            } catch (err) {
                console.error(err);
                return h.view('message3');
            }
        }
    },
]
