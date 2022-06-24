//
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../middleware/errorResponse");

//MAX DURATION
const maxDuration = 3 * 24 * 60 * 60 * 1000;

//FUNCTION CREATE TOKEN
const createToken = id => {
	return jwt.sign({ id: id, isAdmin: id.isAdmin }, process.env.TOKEN_SECRET, {
		expiresIn: maxDuration
	});
};

//REGISTER
exports.register = async (req, res, next) => {
	const pseudo = req.body.pseudo;
	const email = req.body.email;
	const password = req.body.password;
	//REGEX
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (pseudo == null || email == null || password == null)
		return res
			.status(200)
			.json({ error: "Veuillez bien renseigner vos paramétres d'inscription" });
	if (pseudo.length <= 3)
		return res.status(200).json({ error: "Votre pseudo doit comporter plus de 3 lettres" });
	if (!emailRegex.test(email))
		return res.status(200).json({ error: "Votre email n'est pas valide" });
	if (password.length <= 3)
		return res
			.status(200)
			.json({ error: "Votre mot de passe doit être supérieur à 3 caractéres" });

	try {
		const resultPseudo = await models.User.findOne({ where: { pseudo: pseudo } });
		const resultEmail = await models.User.findOne({ where: { email: email } });

		if (resultPseudo) return res.status(200).json({ error: " Ce pseudo est déjà pris !!!" });
		if (resultEmail) return res.status(200).json({ error: " Cet email est déjà pris !!!" });

		await bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(req.body.password, salt, function (err, hash) {
				const user = {
					pseudo: pseudo,
					email: email,
					password: hash,
					isAdmin: 0
				};

				models.User.create(user);
				res.status(201).json(user);
			});
		});
	} catch (error) {
		res.status(400).json(error);
		console.log(error);
	}
};

//LOGIN
exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) return next(new ErrorResponse("Invalid parameters", 200));
	try {
		await models.User.findOne({ where: { email: email } }).then(user => {
			if (!user) {
				return next(new ErrorResponse("Invalid email", 200));
			}
			bcrypt
				.compare(password, user.password)
				.then(valid => {
					if (!valid) {
						return next(new ErrorResponse("Invalid password", 200));
					}
					const token = createToken(user.id);
					res.cookie("jwt", token, { httpOnly: true, maxDuration });
					res.status(201).json({ user: user.id, token: token });
				})
				.catch(error => res.status(500).json(error));
		});
	} catch (error) {
		res.status(400).json(error);
		console.log(error);
	}
};

//LOGOUT
exports.logout = (req, res) => {
	res.cookie("jwt", "", { maxDuration: 1 });
	res.redirect("/");
};
