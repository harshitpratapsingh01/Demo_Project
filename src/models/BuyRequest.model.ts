import Sequelize from "sequelize";
import { sequelize } from "../utils/DbConnection";

export const Buyrequest = sequelize.define('buyrequest', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    property_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } },
    requestStatus: {type: Sequelize.STRING, defaultValue: "Request Pending" },
    createdAt: { type: Sequelize.DATE, defaultValue: Date.now() },
    updatedAt: { type: Sequelize.DATE, defaultValue: Date.now() }
});