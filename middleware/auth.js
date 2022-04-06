//
const jwt = require("jsonwebtoken");
const models = require("../models");

//CHECK USER
module.exports.checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				// res.cookie("jwt", "", { maxAge: 1 }); // a verfier si incidence sur le changement de session
				next();
			} else {
				// let user = await models.User.findOne(decodedToken.id);
				let user = await models.User.findOne({ where: decodedToken.id });

				res.locals.user = user;
				// console.log(res.locals.user);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

//REQUIRE AUTH
module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.send(200).json("Pas de TOKEN");
			} else {
				// console.log(decodedToken);
				// console.log(decodedToken.id); //=> Donne indefined

				next();
			}
		});
	} else {
		console.log("Pas de token");
	}
};
