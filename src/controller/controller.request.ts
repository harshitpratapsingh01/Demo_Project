import { User } from "../models/DbSchema";
import nodemailer from "nodemailer";
import { Property } from "../models/schema.property";

export class BuyRequest {
    static async property_buy_request(user, property_id) {
        try {
            if (!user) {
                console.log("User not Found")
            }

            const property: any = await Property.findOne({ where: { id: property_id } });

            const owner: any = await User.findOne({ where: { id: property.seller_id } });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: owner.email,
                subject: 'Interest in Your Property Listing',
                text: `Dear ${owner.name}, \n\nI hope this email finds you well. I am writing to inform you that there has been a keen interest in your property listing on our platform. A potential buyer/renter has expressed interest in learning more about your property, and I wanted to share their details with you. \n\nInterested Person Details: \n\nName: ${user.name} \nContact Email: ${user.email} \nContact Phone: ${user.mobile_no} \n\nWe encourage you to reach out to the interested party at your earliest convenience to discuss the property details, schedule a viewing, and answer any questions they may have. This could be a great opportunity to connect with a potential buyer/renter who is genuinely interested in your property. \n\nIf you have any questions or require any assistance, please feel free to contact our support team at ${process.env.EMAIL_ADDRESS}. \n\nThank you for choosing our platform to list your property. We wish you the best of luck in your property dealings. \n\nBest regards, \n\nApplication Handler \nMakaan \n${process.env.EMAIL_ADDRESS}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}