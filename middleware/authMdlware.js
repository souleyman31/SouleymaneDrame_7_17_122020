//
const jwt = require("jsonwebtoken");
const models = require("../models");

//CHECK ALL USERS
exports.checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await models.User.findOne({ where: decodedToken.id });
				res.locals.user = user;
				// console.log(user);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

//AUTH AN USER
exports.authUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.status(200).json("Pas de Token");
			} else {
				// console.log(decodedToken.id);
				next();
			}
		});
	} else {
		console.log("Pas de Token");
	}
};
