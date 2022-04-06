//NPM I AXIOS AND DOTENV

import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
	const [formSubmit, setFormSubmit] = useState(false);
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [controlPassword, setControlPassword] = useState("");

	//HANDLE-REGISTER
	const handleRegister = async e => {
		e.preventDefault();

		//Declaration of ERRORS
		const terms = document.getElementById("terms");
		const emailError = document.querySelector(".email.error");
		const passwordConfirmError = document.querySelector(".password-conf.error");
		const termsError = document.querySelector(".terms.error");
		const passwordError = document.querySelector(".password.error");
		const pseudoError = document.querySelector(".pseudo.error");

		//"" for passwprdConfirmError and termsError
		passwordConfirmError.innerHTML = "";
		termsError.innerHTML = "";

		//Validation ERRORS
		if (password !== controlPassword || !terms.checked || !email || !password || !pseudo) {
			if (password !== controlPassword)
				passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";

			if (!terms.checked) termsError.innerHTML = "Veuillez valider les conditions générales";

			if (!email || !password || !pseudo)
				emailError.innerHTML = "Veuillez vous inscrire avant de valider l'inscription ";
			passwordError.innerHTML = "Veuillez vous inscrire avant de valider l'inscription ";
			pseudoError.innerHTML = "Veuillez vous inscrire avant de valider l'inscription ";
		} else {
			await axios({
				method: "POST",
				url: `${process.env.REACT_APP_API_URL}/api/users/signup`,
				withCredentials: true,
				data: {
					pseudo,
					email,
					password
				}
			})
				.then(res => {
					// console.log(res);
					if (res.data.error) {
						// pseudoError.innerHTML = res.data.error;
						// passwordError.innerHTML = res.data.error;
						emailError.innerHTML = res.data.error;
					} else {
						// window.location = '/';
						setFormSubmit(true);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	return (
		<div>
			{formSubmit ? (
				<>
					<SignInForm />
					<span></span>
					<h4 className="success">
						{" "}
						L'inscription est reussie. Veillez vous connecter !!!{" "}
					</h4>
				</>
			) : (
				<form action="#" id="sign-up-form" onSubmit={handleRegister}>
					<div className="form-control">
						<label htmlFor="pseudo">Pseudo</label>
						<input
							type="text"
							id="pseudo"
							placeholder="pseudo"
							name="pseudo"
							onChange={e => setPseudo(e.target.value)}
							value={pseudo}
						/>
						<div className="pseudo error"></div>
					</div>
					<br />
					<div className="form-control">
						<label htmlFor="email"> Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="email"
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
						<div className="email error"></div>
					</div>
					<br />
					<div className="form-control">
						<label htmlFor="password">Mot de passe</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="password"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
						<div className="password error"></div>
					</div>
					<br />
					<div className="form-control">
						<label htmlFor="password-conf">Confirmer mot de passe</label>
						<input
							type="password"
							id="password1"
							name="password-conf"
							onChange={e => setControlPassword(e.target.value)}
							value={controlPassword}
						/>
						<div className="password-conf error"></div>
					</div>
					<br />
					<div className="form-control">
						<input type="checkbox" id="terms" name="terms" />
						<label htmlFor="terms">
							J'accepte les
							<a href="/" target="_blank" rel="noopener noreferrer">
								{" "}
								conditions générales
							</a>
						</label>
						<div className="terms error"></div>
					</div>
					<br />

					<input type="submit" value="Valider l'inscription" />
				</form>
			)}
		</div>
	);
};

export default SignUpForm;
