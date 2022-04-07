import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";

function index() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/trending" element={<Trending />} />
				</Routes>
			</Router>
		</div>
	);
}

export default index;
