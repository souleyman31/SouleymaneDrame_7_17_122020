//
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadProfil = () => {
	//
	const [file, setFile] = useState("");
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	const onChange = e => {
		setFile(e.target.files[0]);
		console.log(e.target.files);
	};

	const handlePicture = e => {
		e.preventDefault();
		const data = new FormData();
		//On les retrouve dans le userReducer
		data.append("name", userData.pseudo);
		data.append("userId", userData.id);
		data.append("picture", file);

		//DISPATCH
		dispatch(uploadPicture(data, userData.id));
	};

	//
	return (
		<div>
			<form action="POST" onSubmit={handlePicture} enctype="multipart/form-data">
				<div className="upload-pic">
					<label htmlFor="file"> Changer d'image</label>
					<input
						type="file"
						id="file"
						name="picture"
						accept=".jpg, .jpeg, .png"
						onChange={onChange}
					/>
					<br />
					<input type="submit" value="Envoyer" />
				</div>
			</form>
		</div>
	);
};

export default UploadProfil;
