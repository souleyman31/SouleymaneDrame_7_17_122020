//
const models = require("../models");
const asyncFun = require("async");

//Const
const ITEMS_LIMIT = 50;

//CREATE
exports.createComment = (req, res, next) => {
	try {
		const userId = req.body.userId;
		const posterId = req.body.posterId;
		const comments = req.body.comments;
		if (posterId <= 0) return res.status(400).json({ error: "Absence de commentaires" });

		//
		asyncFun.waterfall(
			[
				function (done) {
					models.User.findOne({
						where: { id: userId }
					})
						.then(function (userFound) {
							done(null, userFound);
						})
						.catch(function (err) {
							return res
								.status(500)
								.json({ error: "Impossible de vérfier l'utilisateur" });
						});
				},
				function (userFound, done) {
					if (userFound) {
						models.Post.findOne({
							where: { id: posterId }
						})
							.then(function (posterFound) {
								done(null, posterFound, userFound);
							})
							.catch(function (err) {
								return res
									.status(500)
									.json({ error: "Imposible de vérifier le commentaire" });
							});
					} else {
						res.status(404).json({ error: "L'utilisateur n'existe pas" });
					}
				},

				function (posterFound, userFound, done) {
					models.Comment.create({
						UserId: userFound.id,
						PostId: posterFound.id,
						comments: comments
					})

						.then(function (newMessage) {
							done(newMessage);
						})
						.catch(function (err) {
							return res.status(500).json({
								error: "Imposible de vérifier le commentaire ou l'utilisateur"
							});
						});
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

//GET ALL
exports.getAllComment = async (req, res, next) => {
	const order = req.query.order;
	await models.Comment.findAll({
		include: [
			{
				model: models.User,

				attributes: ["id", "pseudo"]
			}
			// {
			// 	model: models.Post,

			// 	attributes: ["id", "userId", "message"]
			// }
		],
		order: [["createdAt", "DESC"]],
		attributes: ["id", "postId", "userId", "comments", "updatedAt"]
	})
		.then(comments => {
			if (comments) {
				return res.status(200).json(comments);
			} else {
				res.status(404).json({ error: "Le commentaire est introuvable" });
			}
		})
		.catch(error => res.status(500).json({ error: "Les champs sont invalides" }));
};

//SINGLE
exports.getSingleComment = async (req, res, next) => {
	await models.Comment.findOne({
		attributes: ["id", "posterId", "userId", "comments"],
		where: {
			id: req.params.id
		}
	})
		.then(comment => {
			if (comment) {
				return res.status(200).json(comment);
			} else {
				res.status(404).json({ error: "Le commentaire est introuvable" });
			}
		})
		.catch(error => res.status(500).json({ error: "Les champs sont invalides" }));
};

//UPDATE
exports.updateComment = (req, res, next) => {
	const comments = req.body.comments;
	if (comments == null) return res.status(400).json({ error: "Rien à commenter" });
	try {
		asyncFun.waterfall(
			[
				function (done) {
					models.Comment.findByPk(req.params.id)
						.then(function (commenterFound) {
							done(null, commenterFound);
						})
						.catch(function (err) {
							return res.status(500).json({ error: "Commentaire non authentifié" });
						});
				},
				function (commenterFound, done) {
					if (commenterFound) {
						commenterFound
							.update({
								comments: comments ? comments : commenterFound.comments
							})
							.then(function () {
								done(commenterFound);
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
			function (commenterFound) {
				if (commenterFound) {
					return res.status(201).json(commenterFound);
				} else {
					return res.status(500).json({
						error: "Le commentaire est introuvable"
					});
				}
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
};

//DELETE
exports.deleteComment = async (req, res, next) => {
	try {
		const comment = await models.Comment.destroy({
			where: { id: req.params.id }
		});
		if (!comment) return res.status(400).json({ msg: "Pas de commentaire trouvé" });
		res.status(200).json({ msg: "Commentaire supprimé" });
	} catch (error) {
		res.status(400).json(error);
	}
};
