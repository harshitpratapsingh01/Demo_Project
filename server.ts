import hapi from "@hapi/hapi";
import * as dotenv from 'dotenv';
import { Connection } from "./src/core/DbConnection";
import { routes } from "./src/routes/index.routes";
import plugin from "./src/middleware/userAuth";
import inert from "@hapi/inert";
import vision from "@hapi/vision";
import path from "path";

dotenv.config();

class Init {
    static async hapiserver() {
        const server = hapi.server({
            port: process.env.PORT,
            host: process.env.HOST,
        });

        await Connection.dbconnection();
        await server.register(plugin);
        await server.register([vision, inert]);

        server.views({
            engines: {
                ejs: require('ejs')
            },
            relativeTo: path.join(__dirname, '..'),
            path: 'real-estate-html-template'
        });

        server.route(routes);

        server.route({
            method: 'GET',
            path: '/static/{param*}',
            handler: {
                directory: {
                    path: path.join(__dirname, '..', 'real-estate-html-template'), 
                    listing: false,
                    index: false
                }
            }
        });

        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

Init.hapiserver();