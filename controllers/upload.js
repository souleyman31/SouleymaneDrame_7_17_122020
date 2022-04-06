//

const multer = require("multer");
const models = require("../models");
const asyncFun = require("async");
const path = require("path");

//
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "client/public/uploads"); // => Dossier Images
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // => 1/1/2021.png
	}
});

exports.uploadImage = multer({
	storage: storage,
	limits: { fileSize: "1000000" },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|gif/;
		const mimeType = fileTypes.test(file.mimetype);
		const extname = fileTypes.test(path.extname(file.originalname));

		if (mimeType && extname) {
			return cb(null, true);
		}
		cb("Veuillez télécharger le bon format");
	}
}).single("picture"); // cest le picture du model et du frontend

exports.uploadProfil = (req, res, next) => {
	try {
		asyncFun.waterfall(
			[
				function (done) {
					models.User.findOne({
						attributes: ["id", "picture"],
						where: { id: req.params.id }
					})
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
						userFound
							.update({
								// bio: req.body.bio ? req.body.bio : userFound.bio
								picture: `${req.protocol}://${req.get(
									"host"
								)}/client/public/uploads/${req.file.filename}`
									? `${req.protocol}://${req.get("host")}/client/public/uploads/${
											req.file.filename
									  }`
									: userFound.picture
							})
							.then(function () {
								done(userFound);
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
			function (userFound) {
				if (userFound) {
					return res.status(201).json(userFound);
				} else {
					return res
						.status(500)
						.json({ error: "Le profil de l'utlisateur ne peut pas être modifié" });
				}
			}
		);
	} catch (error) {
		res.status(400).json(error);
	}
};
