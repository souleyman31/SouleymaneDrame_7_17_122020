//
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function Log({ signup, signin }) {
	const [signUpModal, setSignUpModal] = useState(signup);
	const [signInModal, setSignInModal] = useState(signin);

	//
	const handleModals = e => {
		if (e.target.id === "register") {
			setSignUpModal(true);
			setSignInModal(false);
		} else if (e.target.id === "login") {
			setSignUpModal(false);
			setSignInModal(true);
		}
	};

	return (
		<div>
			<div className="connection-form">
				<div className="form-container">
					<ul>
						<li
							onClick={handleModals}
							id="register"
							className={signUpModal ? "active-btn" : null}
						>
							S'inscrire
						</li>
						<li
							onClick={handleModals}
							id="login"
							className={signInModal ? "active-btn" : null}
						>
							Se connecter
						</li>
					</ul>
					{signUpModal && <SignUpForm />}
					{signInModal && <SignInForm />}
				</div>
			</div>
		</div>
	);
}

export default Log;
