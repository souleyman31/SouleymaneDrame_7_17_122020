//
const ErrorResponse = require("./errorResponse");
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	//Console
	console.log(err.stack.white.inverse);

	//
	if (err.name === "SequelizeDatabaseError") {
		const message = "Veuillez completer le commentaire par un message";
		error = new ErrorResponse(message, 404);
	}

	///

	if (err.message.includes("Invalid parameters")) {
		const message = "Veuillez renseigner un email et un mot de passe corrects !!!";
		error = new ErrorResponse(message, 200);
	}

	if (err.message.includes("Invalid email")) {
		const message = "Utilisateur non trouvé";
		error = new ErrorResponse(message, 200);
	}

	if (err.message.includes("Invalid password")) {
		const message = "Mot de passe incorrect";
		error = new ErrorResponse(message, 200);
	}

	if (err.message.includes("Invalid mimeType")) {
		const message = "Veuillez insérer une image au bon format ";
		error = new ErrorResponse(message, 200);
	}

	res.status(error.statusCode || 500).json({
		error: error.message || "Servor Error"
	});
};
module.exports = errorHandler;
