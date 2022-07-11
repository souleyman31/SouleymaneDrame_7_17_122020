//

const models = require("../models");
const asyncPost = require("async");
const LIMIT_POST = 30;

//CREATE A POST
exports.createPost = async (req, res, next) => {
	const message = req.body.message;
	const userId = req.body.userId;
	// if (!message || !userId) return res.status(400).json({ error: 'Votre message est vide' });

	try {
		await asyncPost.waterfall(
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
							picture: req.file
								? `${req.protocol}://${req.get("host")}/client/public/uploads/${
										req.file.filename
								  }`
								: "",
							video: req.body.video,
							likes: 0
						})
							.then(function (newPost) {
								done(newPost);
							})
							.catch(function (err) {
								next(err);
							});
					} else {
						res.status(404).json({ error: "L'utilisateur est introuvable" });
					}
				}
			],
			function (newPost) {
				if (newPost) {
					return res.status(201).json(newPost);
				} else {
					return res.status(500).json({ error: "Impossible de poster le message" });
				}
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
};

//GET POSTS
exports.getPosts = async (req, res, next) => {
	try {
		const fields = req.query.fields;
		const limit = parseInt(req.query.limit);
		const offset = parseInt(req.query.offset);
		const order = req.query.order;

		if (limit > LIMIT_POST) limit = LIMIT_POST;

		await models.Post.findAll({
			order: [order != null ? order.split(":") : ["id", "DESC"]],
			attributes: fields !== "*" && fields != null ? fields.split(",") : null,
			limit: !isNaN(limit) ? limit : null,
			offset: !isNaN(offset) ? offset : null,
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
			.then(function (posts) {
				if (posts) return res.status(200).json(posts);
				res.status(500).json({ error: "Commentaire introuvable" });
			})
			.catch(function (err) {
				res.status(500).json({ error: "Les champs sont invalides" });
			});
	} catch (error) {
		res.status(400).json(error);
	}
};

//UPDATE POST
exports.updatePost = async (req, res, next) => {
	const id = req.params.id;
	const message = req.body.message;

	try {
		await asyncPost.waterfall(
			[
				function (done) {
					models.Post.findOne({
						where: { id: id }
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
								message: message ? message : posterFound.message
							})
							.then(function () {
								done(posterFound);
							})
							.catch(function (err) {
								return res
									.status(500)
									.json({ error: "L'utilsateur ne peut pas être modifié" });
							});
					} else {
						return res.status(404).json({
							error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} `
						});
					}
				}
			],
			function (posterFound) {
				if (posterFound) {
					return res.status(200).json(posterFound);
				} else {
					return res
						.status(500)
						.json({ error: "Le profil de l'utilisateur ne peut pas être modifié" });
				}
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
};

//DELETE POST
exports.deletePost = async (req, res, next) => {
	try {
		const post = await models.Post.destroy({
			where: { id: req.params.id }
		});
		if (!post)
			return res
				.status(400)
				.json({ msg: `Pas de commentaire trouvé avec l'id ${req.params.id} ` });
		res.status(200).json({ msg: "Utilisateur supprimé" });
	} catch (error) {
		res.status(400).json(error);
	}
};
