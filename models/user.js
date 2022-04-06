"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.User.hasMany(models.Post);
			models.User.hasMany(models.Comment);
		}
	}
	User.init(
		{
			pseudo: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			bio: DataTypes.STRING,
			picture: DataTypes.STRING,
			following: DataTypes.STRING,
			followers: DataTypes.STRING,
			isAdmin: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: "User"
		}
	);
	return User;
};
