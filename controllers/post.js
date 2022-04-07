//
const models = require("../models");
const asyncFun = require("async");

//Const
const ITEMS_LIMIT = 50;

//CREATE A POST
exports.createPost = (req, res, next) => {
	try {
		const message = req.body.message;
		const userId = req.body.userId;
		if (!message || !userId) return res.status(400).json({ error: "Votre message est vide" });

		asyncFun.waterfall(
			[
				function (done) {
					models.User.findOne({ where: { id: userId } })
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
						models.Post.create({
							message: message,
							UserId: userFound.id,
							// picture: `${req.protocol}://${req.get("host")}/client/public/uploads/${
							// 	req.file.filename
							// }`
							// 	? `${req.protocol}://${req.get("host")}/client/public/uploads/${
							// 			req.file.filename
							// 	  }`
							// 	: userFound.picture,
							video: req.body.video,
							likes: 0
						}).then(function (newMessage) {
							done(newMessage);
						});
					} else {
						res.status(404).json({ error: "L'utilisateur est introuvable" });
					}
				}
			],
			function (newMessage) {
				if (newMessage) {
					return res.status(201).json(newMessage);
				} else {
					return res.status(500).json({ error: "Impossible de poster le message" });
				}
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
};

//GET ALL POST
exports.readPost = async (req, res, next) => {
	try {
		//
		const fields = req.query.fields;
		const limit = parseInt(req.query.limit);
		const offset = parseInt(req.query.offset);
		const order = req.query.order;

		if (limit > ITEMS_LIMIT) {
			limit = ITEMS_LIMIT;
		}

		//
		await models.Post.findAll({
			order: [order != null ? order.split(":") : ["id", "DESC"]],
			attributes: fields !== "*" && fields != null ? fields.split(",") : null,
			limit: !isNaN(limit) ? limit : null,
			offset: !isNaN(offset) ? offset : null,
			attributes: [
				"id",
				"UserId",
				"message",
				"picture",
				"video",
				"likes",
				"createdAt",
				"updatedAt"
			],
			include: [
				{
					model: models.User,
					attributes: ["pseudo"]
				},
				{
					model: models.Comment
				}
			]
		})
			.then(function (messages) {
				if (messages) {
					res.status(200).json(messages);
				} else {
					res.status(404).json({ error: "Commentaire introuvable" });
				}
			})
			.catch(function (err) {
				res.status(500).json({ error: "Les champs sont invalides" });
			});
	} catch (error) {
		res.status(400).json(error);
	}
};

//
exports.updatePost = (req, res, next) => {
	try {
		asyncFun.waterfall(
			[
				function (done) {
					models.Post.findOne({
						where: { id: req.params.id }
					})
						.then(function (posterFound) {
							done(null, posterFound);
						})
						.catch(function (err) {
							return res
								.status(500)
								.json({ error: "Impossible de vérifier le commentaire" });
						});
				},
				function (posterFound, done) {
					if (posterFound) {
						posterFound
							.update({
								message: req.body.message ? req.body.message : posterFound.message
							})
							.then(function () {
								done(posterFound);
							})
							.catch(function (err) {
								return res
									.status(500)
									.json({ error: "Le commentaire ne peut pas être modifié" });
							});
					} else {
						return res.status(404).json({
							error: `Pas de commentaire trouvé avec l'id ${req.params.id} `
						});
					}
				}
			],
			function (posterFound) {
				if (posterFound) {
					return res.status(201).json(posterFound);
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
exports.deletePost = async (req, res, next) => {
	try {
		const poster = await models.Post.destroy({
			where: { id: req.params.id }
		});
		if (!poster) {
			return res.status(400).json({ msg: "Pas d'utilisateur trouvé" });
		}
		res.status(200).json({ msg: "Utilisateur supprimé" });
	} catch (error) {
		res.status(400).json(error);
	}
};
