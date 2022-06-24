//
const models = require("../models");
const asyncComment = require("async");

//
//CREATE A COMMENT
exports.createComment = async (req, res, next) => {
	const userId = req.body.userId;
	const postId = req.params.id;
	const comments = req.body.comments;
	if (postId <= 0) return res.status(400).json({ error: "Absence de commentaires" });
	//
	try {
		await asyncComment.waterfall(
			[
				function (done) {
					models.Post.findOne({
						where: { id: postId }
					})
						.then(function (userFound) {
							done(null, userFound);
						})
						.catch(function (err) {
							res.status(500).json({ error: "Imposible de vérifier le commentaire" });
						});
				},
				function (userFound, done) {
					if (userFound) {
						models.User.findOne({
							where: { id: userId }
						})
							.then(function (posterFound) {
								done(null, posterFound, userFound);
							})
							.catch(function (err) {
								return res
									.status(500)
									.json({ error: "Impossible de vérfier l'utilisateur" });

								console.log(err);
							});
					} else {
						return res.status(404).json({ error: "Le commentaire n'existe pas" });
					}
				},
				function (posterFound, userFound, done) {
					models.Comment.create({
						UserId: posterFound.id,
						PostId: userFound.id,
						comments: comments
					})
						.then(function (newMessage) {
							done(newMessage);
						})
						.catch(function (err) {
							res.status(500).json({
								error: "Imposible de vérifier le commentaire ou l'utilisateur"
							});
							console.log(err);
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

//GET ALL COMMENTS
exports.getComments = async (req, res, next) => {
	try {
		const order = req.query.order;
		await models.Comment.findAll({
			include: [{ model: models.User, attributes: ["id", "pseudo"] }],
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
			.catch(err => res.status(500).json({ error: "Les champs sont invalides" }));
	} catch (error) {
		res.status(400).json(error);
	}
};

//GET A COMMENT
exports.getComment = async (req, res, next) => {
	await models.Comment.findOne({
		attributes: ["id", "postId", "userId", "comments"],
		where: { id: req.params.id }
	})
		.then(comment => {
			if (comment) return res.status(200).json(comment);
			res.status(404).json({ error: "Le commentaire est introuvable" });
		})
		.catch(err => res.status(500).json({ error: "Les champs sont invalides" }));
};

//UPDATE A COMMENT
exports.updateComment = async (req, res, next) => {
	const comments = req.body.comments;
	if (comments == null) return res.status(400).json({ error: "Rien à commenter" });

	try {
		const user = await models.Comment.update(
			{ comments: req.body.comments },
			{ where: { id: req.params.id } }
		);
		if (!user) {
			return res
				.status(400)
				.json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(400).json(error);
	}
};

//DELETE A COMMENT
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
