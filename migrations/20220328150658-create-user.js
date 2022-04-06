"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			pseudo: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			bio: {
				allowNull: true,
				type: Sequelize.STRING
			},
			picture: {
				allowNull: true,
				type: Sequelize.STRING
			},
			following: {
				allowNull: true,
				type: Sequelize.STRING
			},
			followers: {
				allowNull: true,
				type: Sequelize.STRING
			},
			isAdmin: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	}
};
