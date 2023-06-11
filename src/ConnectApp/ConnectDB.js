const Sequelize = require("sequelize");

const db = new Sequelize("node-js-blog", "root", null, {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

const connectDB = async () => {

    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }

}

module.exports = connectDB


/* 
=> dev bieet connect den db thanh cong: test connection

*/