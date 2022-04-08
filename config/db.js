//
const Sequelize = require("sequelize");
const connectDB = new Sequelize("groupomania", "root", "root", {
	host: "localhost",
	dialect: "mysql2",

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
});

module.exports = connectDB;
