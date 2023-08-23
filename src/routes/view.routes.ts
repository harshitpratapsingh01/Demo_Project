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
            return h.view('property-list');
        }
    },
    {
        method: "GET",
        path: "/property-type",
        handler: (request, h) => {
            return h.view('property-type');
        }
    },
    {
        method: "GET",
        path: "/about",
        handler: (request, h) => {
            return h.view('about');
        }
    },
    {
        method: "GET",
        path: "/contact",
        handler: (request, h) => {
            return h.view('contact');
        }
    }
]