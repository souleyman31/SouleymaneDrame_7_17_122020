//

import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordResp, setPasswordResp] = useState("");
	const [submit, setSubmit] = useState(false);

	//HANDLE REGISTER
	const handleRegister = async e => {
		e.preventDefault();

		//ERRORS
		const terms = document.getElementById("terms");
		const passwordRespError = document.querySelector(".password-resp.error");
		const termsError = document.querySelector(".terms.error");

		passwordRespError.innerHTML = "";
		termsError.innerHTML = "";

		if (password !== passwordResp || !terms.checked) {
			if (password !== passwordResp)
				return (passwordRespError.innerHTML = "Les mots de passe ne correspondent pas ");
			if (!terms.checked)
				return (termsError.innerHTML = "Veuillez valider les conditions générales");
		} else {
			await axios({
				method: "POST",
				url: `${process.env.REACT_APP_API_URL}/api/users/register`,
				withCredentials: true,
				data: {
					pseudo,
					email,
					password
				}
			})
				.then(res => {
					if (res.data.error) {
						passwordRespError.innerHTML = res.data.error;
					} else {
						setSubmit(true);
					}
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<>
			{submit ? (
				<>
					<SignInForm />
					<br />

					<h4 className="success">Enregistrement reussi. Veuillez vous connecter !!!</h4>
				</>
			) : (
				<form action="#" id="sign-up-form" onSubmit={handleRegister}>
					<label htmlFor="pseudo">Pseudo</label> <br />
					<input
						type="text"
						name="pseudo"
						id="pseudo"
						defaultValue={pseudo}
						onChange={e => setPseudo(e.target.value)}
					/>
					<br /> <br />
					<label htmlFor="email"> Email </label> <br />
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
					<br /> <br />
					<label htmlFor="password-resp">Confirmer votre mot de passe</label> <br />
					<input
						type="password"
						name="password-resp"
						id="password-resp"
						defaultValue={passwordResp}
						onChange={e => setPasswordResp(e.target.value)}
					/>
					<div className="password-resp error"></div> <br />
					<input type="checkbox" name="terms" id="terms" />
					<label htmlFor="terms">
						Acceptez les{" "}
						<a href="www.google.com" target="_blank">
							{" "}
							conditions générales{" "}
						</a>{" "}
					</label>
					<div className="terms error"></div> <br />
					<input type="submit" value="Valider l'inscription" />
				</form>
			)}
		</>
	);
};

export default SignUpForm;
