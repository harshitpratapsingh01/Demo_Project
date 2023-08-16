import hapi from "@hapi/hapi";
import * as dotenv from 'dotenv';
import { Connection } from "./src/core/DbConnection";
import { routes } from "./src/routes/index.routes";
import plugin from "./src/middleware/userAuth";

dotenv.config();

class Init {
    static async hapiserver() {
        const server = hapi.server({
            port: process.env.PORT,
            host: process.env.HOST,
            routes: {
                cors: {
                  origin: ['*'],
                  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Authorization', 'Content-Type', 'If-None-Match']
                },
              }
        });

        await Connection.dbconnection();
        await server.register(plugin);

        server.route(routes);
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

Init.hapiserver();