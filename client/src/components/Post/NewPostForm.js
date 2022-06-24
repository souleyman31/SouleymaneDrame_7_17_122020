import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
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

	const handlePicture = e => {
		setPostPicture(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
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
		// INJECTION FUNC HANDLEVIDEO
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
						{/* FIRST: IMAGE */}
						<NavLink to="/profil">
							<div className="user-info">
								<img src={userData.picture} alt="user-img" />
							</div>
						</NavLink>

						{/* SECOND: FORM */}
						<div className="post-form">
							<label>
								<div className="user-infos">
									<h3> {userData.pseudo} - Votre mur de publication </h3>
								</div>

								<br />
								<textarea
									name="message"
									id="message"
									placeholder="Exprimez vous... "
									onChange={e => setMessage(e.target.value)}
									value={message}
								/>
							</label>
							{/* 3 conditions for the prévisualitions */}
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
									</div>
								</div>
							) : null}

							{/* FOOTER FORM  */}
							<div className="footer-form">
								{/* FIRST FOOTER */}
								<div className="icon">
									{/* UPLOAD VIDEO */}
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
									{/* DELETE  VIDEO */}
									{video && (
										<button onClick={() => setVideo("")}>
											Supprimer la video
										</button>
									)}
								</div>

								{/*  ERRORS */}
								{!isEmpty(error) && <p>{error}</p>}
								{/* {console.log(error)} */}

								{/* SECOND  FOOTER */}
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
										}}
									>
										Envoyer
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default NewPostForm;
