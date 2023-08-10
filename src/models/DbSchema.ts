import { Model, DataTypes } from 'sequelize';
import Sequelize from 'sequelize';
import { sequelize } from '../core/DbConnection';


const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    name: {type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    mobile_no: { type: Sequelize.STRING, allowNull: false, unique: true },
    profilePic: { type: Sequelize.BLOB, allowNull: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Date.now() },
    updatedAt: { type: Sequelize.DATE, defaultValue: Date.now() }
});

(async function() {
    await User.sync({alter: true});
})();

export { User };