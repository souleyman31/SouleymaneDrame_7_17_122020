//
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import UploadProfil from "./UploadProfil";

const UpdateProfil = () => {
	const userData = useSelector(state => state.userReducer);
	const usersData = useSelector(state => state.usersReducer);
	const [bio, setBio] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const [followingPopup, setFollowingPopup] = useState(false);
	const [followersPopup, setFollowersPopup] = useState(false);
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
							<h3>Bio</h3>
							{/* FIRST  */}
							{updateForm === false && (
								<>
									<p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
									<button onClick={() => setUpdateForm(!updateForm)}>
										Modifier la bio
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
						<h4>
							{" "}
							{userData.pseudo} est membre depuis le {dateParser(userData.createdAt)}{" "}
						</h4>
						<h5 onClick={() => setFollowingPopup(true)}>
							Abonnements : {userData.following ? userData.following.length : "0"}
						</h5>
						<h5 onClick={() => setFollowersPopup(true)}>
							Abonnés : {userData.followers ? userData.followers.length : "0"}
						</h5>
					</div>
				</div>
				{/* 1//FOLLOWING POPUP SE MET APRES LE DIV UPD-CONTAINER */}
				{followingPopup && (
					<div className="popup-profil-container">
						<div className="modal">
							<h3>Abonnements</h3>
							<span className="cross" onClick={() => setFollowingPopup(false)}>
								&#10005;
							</span>
							<ul>
								{usersData.map(user => {
									for (let i = 0; i < userData.following.length; i++) {
										if (user.id == userData.following[i]) {
											return (
												<li key={user.id}>
													<img src={user.picture} alt="phot-profil" />
													<h4>{user.pseudo}</h4>

													<div className="follow-handler">
														<FollowHandler
															idToFollow={user.id}
															type={"suggestion"}
														/>
													</div>
												</li>
											);
										}
									}
									// On return null aprés le  'for'
									return null;
								})}
							</ul>
						</div>
					</div>
				)}
				{/* 2//FOLLOWERS POPUP */}
				{followersPopup && (
					<div className="popup-profil-container">
						<div className="modal">
							<h3>Abonnés</h3>
							<span className="cross" onClick={() => setFollowersPopup(false)}>
								&#10005;
							</span>
							<ul>
								{usersData.map(user => {
									for (let i = 0; i < userData.followers.length; i++) {
										if (user.id == userData.followers[i]) {
											return (
												<li key={user.id}>
													<img src={user.picture} alt="user-pic" />
													<h4>{user.pseudo}</h4>

													<div className="follow-handler">
														<FollowHandler
															idToFollow={user._id}
															type={"suggestion"}
														/>
													</div>
												</li>
											);
										}
									}
									// On return null aprés le  'for'
									return null;
								})}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UpdateProfil;
