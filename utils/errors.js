//
//SIGN-UP
exports.signupErrors = err => {
	let errors = { pseudo: "", email: "", password: "" };
	if (err.message.includes("pseudo")) errors.pseudo = "Pseudo incorrect ou déjà pris";
	if (err.message.includes("email")) errors.email = "Email incorrect ou déjà pris";
	if (err.message.includes("password"))
		errors.password = "Le mot de passe doit contenir au moins 6 caractéres";

	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
		errors.pseudo = "Ce pseudo est déjà pris";
	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
		errors.pseudo = "Cet email est déjà enrégistré";

	return errors;
};

//LOGIN
exports.loginErrors = err => {
	let errors = { email: "", password: "" };

	if (err.message.includes("email")) errors.email = "Email inconnu";

	if (err.message.includes("password")) errors.password = "Le mot de passe ne correspond pas";

	return errors;
};

//UPLOAD
module.exports.uploadErrors = err => {
	let errors = { format: "", maxSize: "" };

	if (err.message.includes("invalid file")) errors.format = "Format incompatabile";

	if (err.message.includes("max size")) errors.maxSize = "Le fichier dépasse 500ko";

	return errors;
};
