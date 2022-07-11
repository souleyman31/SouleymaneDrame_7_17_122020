//

const express = require("express");
const colors = require("colors");
const mysql2 = require("mysql2");
const morgan = require("morgan");

const path = require("path");
const logger = require("./middleware/logger");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const db = require("./models");
const dotenv = require("dotenv");
const { checkUser, authUser } = require("./middleware/authMdlware");

dotenv.config({ path: "./config/config.env" });

const app = express();

// //ERRORS CORS
const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	allowedHeaders: ["sessionId", "Content-Type"],
	exposedHeaders: ["sessionId"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false
};
app.use(cors(corsOptions));

//MORGAN
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//LOGGER
app.use(logger);

//BODYPARSER AND COOKIE-PARSER
app.use(bodyParser.json());
app.use(cookieParser());

// CHECK BEFORE THE ROUTES
app.get("*", checkUser);
app.get("/api/users/jwtid", authUser, (req, res) => {
	res.status(200).send(`${res.locals.user.id}`);
});

//STATIC FOLDER
app.use("/client/public/uploads", express.static(path.join(__dirname, "client/public/uploads")));

//ROUTES
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));

//ERROR
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(
			`App listening on mode ${process.env.NODE_ENV} in the port ${PORT}`.white.inverse
		)
	);
});
