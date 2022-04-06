//
const models = require("../models");
const asyncFun = require("async");

//GET ALL
exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await models.User.findAll({
			attributes: [
				"id",
				"pseudo",
				"email",
				"bio",
				"picture",
				"followers",
				"following",
				"createdAt",
				"updatedAt"
			]
		});
		// res.status(200).json({ count: users.length, users });
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json(error);
	}
};

//GET SINGLE
exports.getSingleUser = async (req, res, next) => {
	try {
		const user = await models.User.findOne({
			attributes: [
				"id",
				"pseudo",
				"email",
				"bio",
				"picture",
				"followers",
				"following",
				"createdAt",
				"updatedAt"
			],
			where: { id: req.params.id }
		})
			.then(user => {
				if (user) {
					res.status(200).json(user);
				} else {
					return res
						.status(400)
						.json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
				}
			})
			.catch(err => res.status(400).json({ error: "Err" }));
	} catch (error) {
		res.status(400).json(error);
	}
};

//UPDATE
exports.updateUser = async (req, res, next) => {
	try {
		let id = req.params.id;
		const user = await models.User.update(
			{ bio: req.body.bio ? req.body.bio : "" },
			{ where: { id: id } }
		);
		res.status(200).send(user);
	} catch (error) {
		res.status(400).json(error);
	}
};

//DELETE
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await models.User.destroy({
			where: { id: req.params.id }
		});
		if (!user) {
			return res.status(400).json({ msg: "Pas d'utilisateur trouvé" });
		}
		res.status(200).json({ msg: "Utilisateur supprimé" });
	} catch (error) {
		res.status(400).json(error);
	}
};

//FOLLOW
exports.followUser = (req, res, next) => {
	try {
		asyncFun.waterfall(
			[
				function (done) {
					models.User.findOne({
						where: { id: req.params.id }
					})
						.then(function (userFound) {
							done(null, userFound);
						})
						.catch(function (err) {
							return res
								.status(500)
								.json({ error: "Impossible de vérifier l'utilisateur" });
						});
				},
				function (userFound, done) {
					if (userFound) {
						userFound
							.update({
								following: req.body.idToFollow
									? req.body.idToFollow
									: userFound.following
							})
							.then(function () {
								done(userFound);
							})
							.catch(function (err) {
								return res
									.status(500)
									.json({ error: "Le commentaire ne peut pas être modifié" });
							});
					} else {
						return res.status(404).json({
							error: `Pas de commentaire trouvé avec l'id ${req.params.id}`
						});
					}
				},
				function (done) {
					models.User.findOne({
						where: { id: req.body.idToFollow }
					})
						.then(function (userFound1) {
							done(null, userFound1);
						})
						.catch(function (err) {
							return res
								.status(500)
								.json({ error: "Impossible de vérifier l'utilisateur" });
						});
				},
				function (userFound1, done) {
					if (userFound1) {
						userFound1
							.update({
								followers: req.params.id ? req.params.id : userFound1.followers
							})
							.then(function () {
								done(userFound1);
							})
							.catch(function (err) {
								return res
									.status(500)
									.json({ error: "Le commentaire ne peut pas être modifié" });
							});
					} else {
						return res.status(404).json({
							error: `Pas de commentaire trouvé avec l'id ${req.params.id}`
						});
					}
				}
			],
			function (userFound) {
				if (userFound) {
					return res.status(201).json(userFound);
				} else {
					return res
						.status(500)
						.json({ error: "Le profil de l'utlisateur ne peut pas être modifié" });
				}
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
};

//UNFOLLOW J AI ENLEVE ASYNC
exports.unFollowUser = async (req, res, next) => {
	try {
		//

		const user = await models.User.update(
			{ following: req.body.idToUnFollow },
			{ where: { id: req.params.id } }
		);
		if (!user) {
			return res.status(400).json({ msg: "Pas d'utilisateur trouvé" });
		}
		const user1 = await models.User.update(
			{ followers: req.params.id },
			{ where: { id: req.body.idToUnFollow } }
		);
		if (!user1) {
			return res.status(400).json({ msg: "Pas d'utilisateur trouvé" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json(error);
	}
};
