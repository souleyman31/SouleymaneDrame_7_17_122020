import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
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
								</div>

								<span>{dateParser(post.createdAt)}</span>
							</div>

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

							{/* CARD FOOTER */}
							<div className="card-footer">
								<div className="comment-icon">
									<img
										onClick={() => setShowComments(!showComments)}
										src="./img/icons/message1.svg"
										alt="comment"
									/>

									<span>{post.Comments.length}</span>
								</div>

								<img src="./img/icons/share.svg" alt="share" />
							</div>

							{/* COMMENT A CARD */}
							{showComments && <CommentCard post={post} />}
						</div>
					</>
				)}
			</li>
		</div>
	);
};

export default Card;
