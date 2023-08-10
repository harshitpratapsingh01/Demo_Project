import hapi from "@hapi/hapi";
import { Boom } from "@hapi/boom";
import * as dotenv from 'dotenv';
import { Connection } from "./src/core/DbConnection";
import { User } from "./src/models/DbSchema";
import UserRoutes from "./src/routes/user.routers";
import { PropertyRoutes } from "./src/routes/property.router";
import { OperationRoutes } from "./src/routes/useroperation.routes";

dotenv.config();

class Init {
    static async hapiserver() {
        const server = hapi.server({
            port: process.env.PORT,
            host: process.env.HOST,
        });

        await Connection.dbconnection();
        // try{
        //     await User.sync({ alter: true });
        //     console.log('All models were synchronized successfully.');
        // }
        // catch(err){
        //     console.log(err);
        // }

        server.route(UserRoutes);
        server.route(PropertyRoutes);
        server.route(OperationRoutes)
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

Init.hapiserver();