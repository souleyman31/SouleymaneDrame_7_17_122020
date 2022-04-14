import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, addPostPicture, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [postPicture, setPostPicture] = useState(null);
	const [video, setVideo] = useState("");
	const [file, setFile] = useState();
	const userData = useSelector(state => state.userReducer);
	const error = useSelector(state => state.errorReducer.postError);
	const dispatch = useDispatch();

	const handlePost = async () => {
		if (message || postPicture || video) {
			const data = new FormData();
			data.append("userId", userData.id);
			data.append("message", message);
			if (file) data.append("picture", file);
			data.append("video", video);

			await dispatch(addPost(data));
			dispatch(getPosts());
			cancelPost();
		} else {
			alert("Veuillez entrer un message");
		}
	};
	const handlePostPicture = async () => {
		if (message || postPicture || video) {
			const data = new FormData();
			data.append("userId", userData.id);
			data.append("message", message);
			if (file) data.append("picture", file);
			data.append("video", video);

			await dispatch(addPostPicture(data));
			dispatch(getPosts());
			cancelPost();
		} else {
			alert("Veuillez entrer un message");
		}
	};

	const handlePicture = e => {
		setPostPicture(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]); //pour envoyer à la BDD
		setVideo("");
	};

	const cancelPost = () => {
		setMessage("");
		setPostPicture("");
		setVideo("");
		setFile("");
	};

	//USEEFFECT
	useEffect(() => {
		if (!isEmpty(userData)) setIsLoading(false);
		// ON INJECTE LA FONCTION HANDLEVIDEO
		const handleVideo = () => {
			let findLink = message.split(" ");
			for (let i = 0; i < findLink.length; i++) {
				if (
					findLink[i].includes("https://www.yout") ||
					findLink[i].includes("https://yout")
				) {
					let embed = findLink[i].replace("watch?v=", "embed/");
					setVideo(embed.split("&")[0]);
					findLink.splice(i, 1);
					setMessage(findLink.join(" "));
					setPostPicture("");
				}
			}
		};
		handleVideo();
	}, [userData, message, video]);

	return (
		<>
			<div className="post-container">
				{isLoading ? (
					<i className="fas fa-spinner fa-pulse"></i>
				) : (
					<>
						{/* PARTIE DE DIV DATA */}
						<div className="data">
							<p>
								<span>{userData.following ? userData.following.length : 0}</span>{" "}
								Abonnement
								{userData.following && userData.following.length > 1 ? "s" : null}
							</p>
							<p>
								<span>{userData.followers ? userData.followers.length : 0}</span>{" "}
								Abonné
								{userData.followers && userData.followers.length > 1 ? "s" : null}
							</p>
						</div>
						{/* PARTIE DE l'IMAGE */}
						<NavLink exact to="/profil">
							<div className="user-info">
								<img src={userData.picture} alt="user-img" />
							</div>
						</NavLink>
						{/* PARTIE DE FORM*/}
						<div className="post-form">
							<label>
								Journal
								<textarea
									name="message"
									id="message"
									placeholder="Quoi de neuf à publier ?"
									onChange={e => setMessage(e.target.value)}
									value={message}
								/>
							</label>
							{/* LES 3 RENDUS CONDITIONNELS */}
							{message || postPicture || video.length > 20 ? (
								<div className="card-container">
									{/* CARD-LEFT */}
									<div className="card-left">
										<img src={userData.picture} alt="user-pic" />
									</div>
									{/* CARD-RIGHT */}
									<div className="card-right">
										{/* FIRST CARD-RIGHT */}
										<div className="card-header">
											<div className="pseudo">
												<h3>{userData.pseudo}</h3>
											</div>
											<span>{timestampParser(Date.now())}</span>
										</div>
										{/* SECOND CARD-RIGHT */}
										<div className="content">
											<p>{message}</p>
											<img src={postPicture} alt="" />
											{video && (
												<iframe
													src={video}
													frameBorder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
													title={video}
												></iframe>
											)}
										</div>
										{/* SECOND CARD-RIGHT */}
									</div>
								</div>
							) : null}

							{/* LE DIV-FOOTER-FORM  */}
							<div className="footer-form">
								{/* FIRST DIV-FOOTER */}
								<div className="icon">
									{/* SI ON VEUT TELECHARGER UNE VIDEO */}
									{isEmpty(video) && (
										<>
											<label htmlFor="">
												{" "}
												<img src="./img/icons/picture.svg" alt="img" />
												<input
													type="file"
													id="file-upload"
													name="file"
													accept=".jpg, .jpeg, .png"
													onChange={e => handlePicture(e)}
												/>
											</label>
										</>
									)}
									{/* SI ON VEUT SUPPRIMER UNE VIDEO */}
									{video && (
										<button onClick={() => setVideo("")}>
											Supprimer la video
										</button>
									)}
								</div>

								{/* LA GESTION DES ERREURS */}
								{!isEmpty(error.format) && <p>{error.format}</p>}
								{!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}

								{/* SECOND DIV FOOTER */}
								<div className="btn-send">
									{message || postPicture || video.length > 20 ? (
										<button className="cancel" onClick={cancelPost}>
											Annuler le message
										</button>
									) : null}
									<button
										className="send"
										onClick={() => {
											handlePost();
											handlePostPicture();
										}}
									>
										Envoyer
									</button>
								</div>
							</div>
							{/* FIN LE DIV-FOOTER-FORM */}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default NewPostForm;
