//
//TROP BIEN CE STACKOVERFLOW
//=> https://stackoverflow.com/questions/64859383/how-can-users-like-and-unlike-each-others-post-using-sequelize-postgres-nodejs
//On met du coup sur le body du Postman juste le userId Exemple: "userId": 2 && le resultat nous donne le userId & le postId du Like

const { Op } = require("sequelize");
const models = require("../models");

//LIKE
exports.like = async (req, res, next) => {
	// console.log(req.body);

	const postId = req.params.id;
	const post = await models.Post.findByPk(postId);
	if (!post) return res.status(404).json({ msg: `Le commentaire ${postId} est introuvable` });

	let like = await models.Like.findOne({
		where: { [Op.and]: [{ postId: req.params.id }, { userId: req.body.userId }] }
	});
	if (!like) {
		let newLike = await models.Like.create({
			userId: req.body.userId,
			postId: req.params.id
		});
		return res.json(newLike);
	} else {
		await like.destroy();
		return res.send();
	}
};

//DISLIKE
exports.disLike = (req, res, next) => {};
