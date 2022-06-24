import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

function index() {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default index;
