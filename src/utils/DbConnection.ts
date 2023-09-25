const Sequelize = require('sequelize');
import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host:process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
    pool:{
        max:10,
        min:0,
        aquire:3000,
        idle:10000
    }
  });



class Connection {
    static async dbconnection() {
        // console.log(sequelize)
        try {
            await sequelize.authenticate();
            console.log('DBConnection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export { sequelize, Connection };