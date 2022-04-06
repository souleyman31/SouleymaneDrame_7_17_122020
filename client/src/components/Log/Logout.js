//NPM I -S JS-COOKIE
import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
	const removeCookie = key => {
		if (window !== "undefinded") {
			cookie.remove(key, { expires: 1 });
		}
	};
	const handleLogout = async () => {
		await axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}/api/users/logout`,
			withCredentials: true
		})
			.then(() => removeCookie("jwt"))
			.catch(err => console.log(err));

		window.location = "/";
	};

	return (
		<div>
			<li onClick={handleLogout}>
				<img src="./img/icons/logout.svg" alt="logout" />
			</li>
		</div>
	);
};

export default Logout;
