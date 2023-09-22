"use strict";

import * as redis from "redis";

let client;

(async function () {
    client = await redis.createClient();
    try {
        await client.connect();
        console.log("connected to Redis");
    }
    catch (err) {
        console.log("Redis Connection Error: ", err);
    }
})();


export class Redis {
    static async maintain_session_redis(isUser) {
        try {
            await client.SET(isUser.username, JSON.stringify({
                user_id: isUser.id,
                status: true
            }));
            const session = await client.GET(isUser.username);
            console.log(session);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async logout_session_redis(isUser) {
        try {
            await client.SET(isUser.username, JSON.stringify({
                user_id: isUser.id,
                status: false
            }));
            const session = await client.GET(isUser.username);
            console.log(session);
        }
        catch (err) {
            console.log(err);
        }
    }


    static async save_otp(email, OTP) {
        try {
            await client.SETEX(email, 300, JSON.stringify({
                otp: OTP
            }));
            console.log("otp stored successfully");
        }
        catch (err) {
            console.log(err);
        }
    }

    static async get_otp(email) {
        if (await client.exists(email)) {
            const otp_details = await client.GET(email);
            const userOTP = JSON.parse(otp_details);
            return userOTP.otp
        }
        else {
            return false;
        }
    }


    static async isActiv(username) {
        if (await client.exists(username)) {
            const session = await client.get(username);
            const session_data = JSON.parse(session)
            return session_data.status;
        }
        else {
            return false;
        }
    }
}



