const models = require("../models");

//
//LIKE
exports.like = async (req, res, next) => {
	try {
		const objectToUpdate = {};
		const post = await models.Post.update(
			{ $addToSet: { likers: req.body.id } },
			{ where: { id: req.params.id } }
		);
		res.status(200).json(post);
		console.log(post);

		const objectToUpdateTwo = {};
		const post1 = await models.User.update(
			{ $addToSet: { likes: req.params.id } },
			{ where: { id: req.body.id } }
		);
	} catch (error) {
		res.status(500).json({ msg: "Erreur serveur" });
	}
};

//DISLIKE
exports.dislike = (req, res, next) => {};
