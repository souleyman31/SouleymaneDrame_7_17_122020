//
//PAGE 59 A CHANGER PLUS TARD POUR LE FRONT ENLEVER LE TOKEN

const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginErrors } = require("../utils/errors");

//Fonction createToken à intégrer dans la fonction login
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = id => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: maxAge
	});
};

exports.signup = async (req, res, next) => {
	try {
		const result = await models.User.findOne({ where: { email: req.body.email } });
		if (result) {
			res.status(200).json({ error: " Cet email est déjà pris !!!" });
		} else {
			await bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(req.body.password, salt, function (err, hash) {
					const user = {
						pseudo: req.body.pseudo,
						email: req.body.email,
						password: hash,
						isAdmin: 0
					};

					models.User.create(user);
					res.status(201).json(user);
				});
			});
		}
	} catch (error) {
		res.status(400).json({ msg: error });
	}
};

//Il faut enlever le '_' du Token userId
exports.login = async (req, res, next) => {
	try {
		const user = await models.User.findOne({ where: { email: req.body.email } })
			.then(user => {
				if (!user) {
					return res.status(200).json({ error: "Utilisateur non trouvé !" });
				}
				bcrypt
					.compare(req.body.password, user.password)
					.then(valid => {
						if (!valid) {
							return res.status(200).json({ error: "Mot de passe incorrect !" });
						}
						//ATTENTION USER.ID et NON USER_ID
						const token = createToken(user.id);
						res.cookie("jwt", token, { htttpOnly: true, maxAge });
						//
						res.status(201).json({ user: user.id, token: token });
					})
					.catch(error => res.status(500).json({ error }));
			})
			.catch(error => res.status(500).json({ error }));
	} catch (error) {
		const errors = loginErrors(error);
		res.status(200).json(errors);
	}
};

//LOGOUT (pas besoin de trycatch ni d'async)
exports.logout = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};
