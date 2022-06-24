//
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import DeleteProfil from "./DeleteProfil";
import UploadProfil from "./UploadProfil";

const UpdateProfil = () => {
	const userData = useSelector(state => state.userReducer);
	const [bio, setBio] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const dispatch = useDispatch();

	//
	const handleUpdate = () => {
		dispatch(updateBio(userData.id, bio));
		setUpdateForm(false);
	};

	return (
		<div>
			<div className="profil-container">
				<LeftNav />
				<h1> Profil de {userData.pseudo} </h1>
				<div className="update-container">
					<div className="left-part">
						<h3>Photo de profil</h3>
						<img src={userData.picture} alt="pic" />
						<UploadProfil />
					</div>
					<div className="right-part">
						<div className="bio-update">
							<h3>Biographie</h3>
							{/* FIRST  */}
							{updateForm === false && (
								<>
									<p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
									<button
										color="black"
										onClick={() => setUpdateForm(!updateForm)}
									>
										Modifier la biographie
									</button>
								</>
							)}
							{/* SECOND */}
							{updateForm && (
								<>
									<textarea
										type="text"
										defaultValue={userData.bio}
										onChange={e => setBio(e.target.value)}
									></textarea>
									<button onClick={handleUpdate}>
										Valider les modifications
									</button>
								</>
							)}
						</div>
						<br />
						<span> </span>
						<br />

						<h5>
							{" "}
							{userData.pseudo} est membre depuis le {dateParser(userData.createdAt)}{" "}
						</h5>

						<button>
							Suppression du compte{" "}
							<DeleteProfil id={userData.id} key={userData.id} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfil;
