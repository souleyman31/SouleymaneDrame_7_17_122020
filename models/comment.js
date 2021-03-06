"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			models.Comment.belongsTo(models.User, {
				allowNull: false,
				foreignKeyConstraint: true,
				onDelete: "cascade"
			});

			models.Comment.belongsTo(models.Post, {
				allowNull: false,
				foreignKeyConstraint: true,
				onDelete: "cascade"
			});
		}
	}
	Comment.init(
		{
			comments: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Comment"
		}
	);
	return Comment;
};
