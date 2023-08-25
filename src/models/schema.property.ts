import { sequelize } from "../core/DbConnection";
import Sequelize from "sequelize";
import { User } from "./DbSchema";

export const Property = sequelize.define('Product', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    property_type: { type: Sequelize.STRING, allowNull: false, },
    description: { type: Sequelize.STRING, allowNull: false, },
    images: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true,},
    sqrmeter: { type: Sequelize.FLOAT, allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false, },
    seller_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    featured: {type: Sequelize.ENUM("For Sell", "For Rent"), allowNull: false,},
    bed: {type: Sequelize.INTEGER, allowNull: false, },
    bath: {type: Sequelize.INTEGER, allowNull: false, },
    house_no: { type: Sequelize.STRING, allowNull: false },
    street: { type: Sequelize.STRING, allowNull: false },
    area: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    state: { type: Sequelize.STRING, allowNull: false },
    country: { type: Sequelize.STRING, allowNull: false },
    zipCode: { type: Sequelize.INTEGER, allowNull: false },
    BuyerId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' } },
    location: {type: Sequelize.GEOMETRY('POINT'), allowNull: false, defaultValue: {"type":"Point","coordinates":[0.00, 0.000]}},
    property_status: {type: Sequelize.STRING, defaultValue: "UNSOLD"},
    createdAt: { type: Sequelize.DATE, defaultValue: Date.now() },
    updatedAt: { type: Sequelize.DATE, defaultValue: Date.now() }
});

// (async function () {
//     await Property.sync({ alter: true });
// })();

