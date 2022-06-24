//
const models = require("../models");

//GET USERS
exports.getUsers = async (req, res, next) => {
	try {
		const users = await models.User.findAll({
			attributes: ["id", "pseudo", "email", "bio", "picture"]
		});
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json(error);
	}
};

//GET USER
exports.getUser = async (req, res, next) => {
	try {
		const user = await models.User.findOne({
			where: { id: req.params.id },
			attributes: ["id", "pseudo", "email", "bio", "picture", "createdAt", "updatedAt"]
		});
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

//UPDATE USER
exports.updateUser = async (req, res, next) => {
	try {
		const user = await models.User.update(
			{ bio: req.body.bio ? req.body.bio : "" },
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

//DELETE USER
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await models.User.destroy({
			where: { id: req.params.id }
		});
		if (!user) {
			return res
				.status(400)
				.json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
		}
		res.status(200).json({ msg: "Utilisateur supprimé" });
	} catch (error) {
		res.status(400).json(error);
	}
};
