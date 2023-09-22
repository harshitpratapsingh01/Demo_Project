import  Sequelize  from "sequelize";
import { sequelize } from "../utils/DbConnection";


export const Session = sequelize.define('session', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    status: { type: Sequelize.BOOLEAN, allowNull: false},
    createdAT: { type: Sequelize.DATE, defaultValue: Date.now() },
    updatedAT: { type: Sequelize.DATE, defaultValue: Date.now() }
});

// (async function () {
//     await Session.sync({alter: true});
// })();
