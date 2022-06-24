import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const passwordError = document.querySelector(".password.error");

	//HANDLE LOGIN
	const handleLogin = async e => {
		e.preventDefault();

		await axios({
			method: "POST",
			url: `${process.env.REACT_APP_API_URL}/api/users/login`,
			withCredentials: true,
			data: {
				email,
				password
			}
		})
			.then(res => {
				// console.log(res);
				if (res.data.error) return (passwordError.innerHTML = res.data.error);
				else return (window.location = "/");
			})
			.catch(err => console.log(err));
	};

	return (
		<>
			<form action="#" id="sign-up-form" onSubmit={handleLogin}>
				<label htmlFor="email">Email</label> <br />
				<input
					type="email"
					name="email"
					id="email"
					defaultValue={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<br /> <br />
				<label htmlFor="password">Mot de passe</label> <br />
				<input
					type="password"
					name="password"
					id="password"
					defaultValue={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<br />
				<div className="password error"></div>
				<br />
				<input type="submit" value="Se connecter" />
			</form>
		</>
	);
};

export default SignInForm;
