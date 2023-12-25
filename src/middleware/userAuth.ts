const Jwt = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
import { Redis } from "../utils/redis.session";
const SECRET_KEY = process.env.SECRET_KEY;


const plugin = {
    name: "jwt-authentication",
    version: '1.0.0',
    register: async function(server, options){
        await server.register(Jwt);

        server.auth.strategy('user', 'jwt', {
            key: SECRET_KEY,
            validate: async (decoded, request, h) =>{
                const status = await Redis.isActiv(decoded.username);
                if(!status){
                    return h.response({ message: "please login first" }).code(400);
                }
                request.user = decoded;
                return {isValid: true};
            }
        })
    }
}

export default plugin;