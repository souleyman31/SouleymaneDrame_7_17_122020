import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";

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
			dispatch(addComment(post.id, userData.id, post.UserId, text))
				.then(() => dispatch(getPosts()))
				.then(() => setText(""));
		}
	};

	return (
		<>
			<div className="comments-container">
				{/* FIRST MAP */}
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
							{/* LEFT */}
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

							{/* RIGHT */}
							<div className="right-part">
								<div className="comment-header">
									<div className="pseudo">
										<h3>
											{!isEmpty(usersData[0]) &&
												usersData.map(user => {
													if (user.id === comment.UserId)
														return user.pseudo;
													else return null;
												})}
										</h3>
									</div>

									<span>{timestampParser(comment.updatedAt)}</span>
								</div>

								<p>{comment.comments} </p>
								{/* EDIT AND DELETE  */}
								<EditAndDeleteComment comment={comment} postId={post.id} />
							</div>
						</div>
					);
				})}

				{/* SECOND MAP */}
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
			</div>
		</>
	);
};

export default CommentCard;
