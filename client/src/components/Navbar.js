import React, { useContext } from "react";
import { UidContext } from "./AppContext";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
	const uid = useContext(UidContext);
	const userData = useSelector(state => state.userReducer);

	return (
		<div>
			<nav>
				<div className="nav-container">
					{/* LEFT-NAVBAR */}
					<div className="logo">
						<NavLink exact to="/">
							<div className="logo">
								<img src="./img/icone.png" alt="icon" />
								<h3>Groupomania</h3>
							</div>
						</NavLink>
					</div>
					{/* RIGHT-NAVBAR */}
					{uid ? (
						<ul>
							<li></li>
							<li className="welcome">
								<NavLink to="/profil">
									<h5> Bienvenu {userData.pseudo} </h5>
								</NavLink>
							</li>
							<Logout />
						</ul>
					) : (
						<ul>
							<li></li>
							<li>
								<NavLink to="/profil">
									<img src="./img/icons/login.svg" alt="login" />
								</NavLink>
							</li>
						</ul>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
