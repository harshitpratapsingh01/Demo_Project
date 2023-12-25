import { User } from "../models/DbSchema";
import nodemailer from "nodemailer";
import { Property } from "../models/schema.property";

export class BuyRequest {
    static update(arg0: { requestStatus: string; }, arg1: { where: { id: any; }; }) {
        throw new Error("Method not implemented.");
    }
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

            // const mailOptions = {
            //     from: process.env.EMAIL_ADDRESS,
            //     to: owner.email,
            //     subject: 'Interest in Your Property Listing',
            //     text: `Dear ${owner.name}, \n\nI hope this email finds you well. I am writing to inform you that there has been a keen interest in your property listing on our platform. A potential buyer/renter has expressed interest in learning more about your property, and I wanted to share their details with you. \n\nInterested Person Details: \n\nName: ${user.name} \nContact Email: ${user.email} \nContact Phone: ${user.mobile_no} \n\nWe encourage you to reach out to the interested party at your earliest convenience to discuss the property details, schedule a viewing, and answer any questions they may have. This could be a great opportunity to connect with a potential buyer/renter who is genuinely interested in your property. \n\nIf you have any questions or require any assistance, please feel free to contact our support team at ${process.env.EMAIL_ADDRESS}. \n\nThank you for choosing our platform to list your property. We wish you the best of luck in your property dealings. \n\nBest regards, \n\nApplication Handler \nMakaan \n${process.env.EMAIL_ADDRESS}`
            // };

            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: owner.email,
                subject: 'Interest in Your Property Listing',
                html: `
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                }
                                .header {
                                    background-color: #007bff;
                                    color: #fff;
                                    text-align: center;
                                    padding: 20px;
                                }
                                .content {
                                    padding: 20px;
                                }
                                .contact-details {
                                    background-color: #f0f0f0;
                                    padding: 10px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Interested in Your Property </h1>
                                </div>
                                <div class="content">
                                    <p>Dear ${owner.name},</p>
                                    <p>I hope this email finds you well. I am writing to inform you that there has been a keen interest in your property listing on our platform. A potential buyer/renter has expressed interest in learning more about your property, and I wanted to share their details with you.</p>

                                    <div class="contact-details">
                                        <h2>On Property :</h2>
                                        <p>PropertyType: ${property.property_type}</p>
                                        <p>Description: ${property.description}</p>
                                        <p>SqrMeter: ${property.sqrmeter}</p>
                                        <p>Price: ${property.price}</p>
                                        <p>Bed: ${property.bed}</p> 
                                        <p>Bath: ${property.bath}</p>
                                        <p>Featured: ${property.featured}</p>
                                        <p>House No: ${property.house_no}</p> 
                                        <p>Street: ${property.street}</p>
                                        <p>Area: ${property.area}</p>
                                        <p>City: ${property.city}</p> 
                                        <p>ZipCode: ${property.zipCode}</p>
                                        <p>Property Status: ${property.property_status}</p>
                                    </div>

                                    <div class="contact-details">
                                        <h2>Interested Person Details:</h2>
                                        <p>Name: ${user.name}</p>
                                        <p>Contact Email: ${user.email}</p>
                                        <p>Contact Phone: ${user.mobile_no}</p>
                                    </div>

                                    <p>We encourage you to reach out to the interested party at your earliest convenience to discuss the property details, schedule a viewing, and answer any questions they may have. This could be a great opportunity to connect with a potential buyer/renter who is genuinely interested in your property.</p>

                                    <p>If You reached out to this party and you are interested to sell your property to this party Click <a href="http://localhost:4002/message7?user=${user.name}&property_id=${property_id}">here</a> to sell your property to  ${user.name}.</p>

                                    <p>If you have any questions or require any assistance, please feel free to contact our support team at ${process.env.EMAIL_ADDRESS}.</p>

                                    <p>Thank you for choosing our platform to list your property. We wish you the best of luck in your property dealings.</p>

                                    <p>Best regards,<br>Application Handler<br>Makaan<br>${process.env.EMAIL_ADDRESS}</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
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