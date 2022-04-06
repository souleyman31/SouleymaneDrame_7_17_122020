import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";

import FollowHandler from "../Profil/FollowHandler";

import { isEmpty, timestampParser } from "../Utils";
import EditAndDeleteComment from "./EditAndDeleteComment";

const CommentCard = ({ post }) => {
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);

	const [text, setText] = useState("");

	const dispatch = useDispatch();

	const handleComment = e => {
		e.preventDefault();
		if (text) {
			dispatch(addComment(post.UserId, userData.id, post.id, text))
				.then(() => dispatch(getPosts()))
				.then(() => setText(""));
		}
	};

	return (
		<>
			<div className="comments-container">
				{post.Comments.map(comment => {
					return (
						<div
							className={
								comment.UserId === userData.id
									? "comment-container client"
									: "comment-container"
							}
							key={comment.id}
						>
							{/* LA PARTIE GAUCHE -ON COPIE SUR le Card */}
							<div className="left-part">
								<img
									src={
										!isEmpty(usersData[0]) &&
										usersData
											.map(user => {
												if (user.id === comment.UserId) return user.picture;
												else return null;
											})
											.join("")
									}
									alt="commenter-pic"
								/>
							</div>
							{/* LA PARTIE DROITE */}
							<div className="right-part">
								<div className="comment-header">
									<div className="pseudo">
										{/* Nous donne le nom du pseudo */}
										<h3>
											{!isEmpty(usersData[0]) &&
												usersData.map(user => {
													if (user.id === comment.UserId)
														return user.pseudo;
													else return null;
												})}
										</h3>

										{/* On met la condition avant de faire le followHandler */}
										{comment.UserId !== userData.id && (
											<FollowHandler
												idToFollow={comment.UserId}
												type={"card"}
											/>
										)}
									</div>
									{/* Aprés le div du pseudo */}
									<span>{timestampParser(comment.updatedAt)}</span>
								</div>
								{/* Aprés le div du comment-header */}
								<p>{comment.comments} </p>
								{/* ON VA AJOUTER EDITDELETECOMMENT  */}

								{/* j'ai changé post en comment */}
								<EditAndDeleteComment comment={comment} postId={post.id} />
							</div>
							{/* FIN LA PARTIE DROITE */}
						</div>
					);
				})}

				{/* JUSTE APRES ' {post.comments.map', on va faire le formulaire */}
				{userData.id && (
					<form action="" onSubmit={handleComment} className="comment-form">
						<input
							type="text"
							name="text"
							onChange={e => setText(e.target.value)}
							value={text}
							placeholder="Ajouter un commentaire"
						/>
						<br />
						<input type="submit" value="Envoyer" />
					</form>
				)}

				{/* FIN */}
			</div>
		</>
	);
};

export default CommentCard;
