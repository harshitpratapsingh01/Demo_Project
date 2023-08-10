import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const key = process.env.SECRET_KEY;

export class Validate {
    static async verify_token(token) {
        // const token = req.headers.authorization;
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, key);
            return decoded;
        }
        else {
            return false;
        }
    }
}




