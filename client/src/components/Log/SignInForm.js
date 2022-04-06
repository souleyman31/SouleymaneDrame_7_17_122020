//SignInForm depend de LOG/index
//NPM AXIOS AND DOTENV

import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//HANDLE-LOGIN
	const handleLogin = e => {
		e.preventDefault();

		//Declaration const ERROR
		// const emailError = document.querySelector('.email.error');
		const passwordError = document.querySelector(".password.error");

		//AXIOS
		if (!email || !password) {
			passwordError.innerHTML = "Veuillez entrer votre email et votre mot de passe !!! ";
		} else {
			axios({
				method: "POST",
				url: `${process.env.REACT_APP_API_URL}/api/users/login`,
				withCredentials: true,
				data: {
					email,
					password
				}
			})
				.then(res => {
					// console.log(res)
					if (res.data.error) {
						// emailError.innerHTML = res.data.error;
						passwordError.innerHTML = res.data.error;
					} else {
						// window.location = "/profil"; //Pour tester le localhost/JWTID
						window.location = "/";
					}
				})
				.catch(err => {
					// alert('catch');
					console.log(err);
				});
		}
	};

	return (
		<div>
			<form action="#" id="sign-up-form" onSubmit={handleLogin}>
				<div className="form-control">
					<label htmlFor="email"> Email</label>
					<br />
					<input
						type="email"
						name="email"
						id="email"
						placeholder="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					<div className="email error"></div>
				</div>
				<br />
				<div className="form-control">
					<label htmlFor="password"> Password </label>
					<br />
					<input
						type="password"
						name="password"
						id="password"
						placeholder="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
					<br /> <br />
					<div className="password error"></div>
				</div>
				<br />
				<input type="submit" value="Se connecter" />
			</form>
		</div>
	);
};

export default SignInForm;
