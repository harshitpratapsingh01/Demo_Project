import  Sequelize  from "sequelize";
import { sequelize } from "../utils/DbConnection";

export const Favorites = sequelize.define('favourite', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    property_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Products', key: 'id'}
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "users", key: 'id'}
    }
});

// (async function(){
//     await Favorites.sync({alter: true});
// })();