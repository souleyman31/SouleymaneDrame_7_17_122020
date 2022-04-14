import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { dateParser, isEmpty } from "../Utils";
import CommentCard from "./CommentCard";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false);
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	//UPDATE-ITEM
	const updateItem = () => {
		if (textUpdate) {
			dispatch(updatePost(post.id, textUpdate));
		}
		setIsUpdated(false);
	};

	//
	useEffect(() => {
		!isEmpty(usersData[0]) && setIsLoading(false);
	}, [usersData]);

	return (
		<div>
			<li className="card-container" key={post.id}>
				{isLoading ? (
					<i className="fas fa-spinner fa-spin"></i>
				) : (
					<>
						{/* LEFT */}
						<div className="card-left">
							<img
								src={
									!isEmpty(usersData[0]) &&
									usersData
										.map(user => {
											if (user.id === post.UserId) return user.picture;
											else return null;
										})
										.join("")
								}
								alt="phot-profil"
							/>
						</div>
						{/* RIGHT */}
						<div className="card-right">
							<div className="card-header">
								<div className="pseudo">
									<h3>
										{!isEmpty(usersData[0]) &&
											usersData
												.map(user => {
													if (user.id === post.UserId) return user.pseudo;
													else return null;
												})
												.join("")}
									</h3>
									{/* L'image card du FollowHandler arrive aprés le h3 */}
									{post.UserId !== userData.id && (
										<FollowHandler idToFollow={post.UserId} type={"card"} />
									)}
								</div>
								{/* La date se met aprés le div du pseudo */}
								<span>{dateParser(post.createdAt)}</span>
							</div>
							{/* Aprés le div.card-header */}
							{/* message updated */}
							{isUpdated === false && <p>{post.message} </p>}
							{isUpdated && (
								<div className="update-post">
									<textarea
										defaultValue={post.message}
										onChange={e => setTextUpdate(e.target.value)}
									/>
									<div className="button-container">
										<button className="btn" onClick={updateItem}>
											Valider la modification
										</button>
									</div>
								</div>
							)}
							{/* FIN message updated and next after video */}

							{post.picture && (
								<img src={post.picture} alt="card-pic" className="card-pic" />
							)}
							{post.video && (
								<iframe
									width="500"
									height="300"
									src={post.video}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									title={post.id}
								></iframe>
							)}
							{/* condition userdata === post.userId */}
							{userData.id === post.UserId && (
								<div className="button-container">
									{/* UPDATE-CARD */}
									<div onClick={() => setIsUpdated(!isUpdated)}>
										<img src="./img/icons/edit.svg" alt="edit" />
									</div>
									{/* DELETE-CARD */}
									<DeleteCard id={post.id} />
								</div>
							)}

							{/* Fin condition */}
							{/* La carte footer on aura le nbre de commentaire, les likes et le partage */}
							<div className="card-footer">
								<div className="comment-icon">
									<img
										onClick={() => setShowComments(!showComments)}
										src="./img/icons/message1.svg"
										alt="comment"
									/>
									{/* <span>{post.Users.length}</span> */}
									<span>{post.Comments.length}</span>
								</div>
								<h6>
									LIKES
									{/* <LikeButton post={post} /> */}
								</h6>
								<img src="./img/icons/share.svg" alt="share" />
							</div>
							{/* JUSTE APRES LE DIV CARD-FOOTER */}
							{/* CEST LA QUIL FAUT VOIR POUR LA BOUCLE */}
							{showComments && <CommentCard post={post} />}
						</div>
					</>
				)}
			</li>
		</div>
	);
};

export default Card;
