// Imports
var jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = "<ACCESS_TOKEN_SECRET>";

// Exported functions
module.exports = {
	generateTokenForUser: function (userData) {
		return jwt.sign(
			{
				userId: userData.id,
				isAdmin: userData.isAdmin
			},
			ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1h"
			}
		);
	},
	parseAuthorization: function (authorization) {
		return authorization != null ? authorization.replace("Bearer ", "") : null;
	},
	getUserId: function (authorization) {
		var userId = -1;
		var token = module.exports.parseAuthorization(authorization);
		if (token != null) {
			try {
				var jwtToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
				if (jwtToken != null) userId = jwtToken.userId;
			} catch (err) {}
		}
		return userId;
	}
};
