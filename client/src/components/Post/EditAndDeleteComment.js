import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";

import { UidContext } from "../AppContext";

const EditAndDeleteComment = ({ comment, postId }) => {
	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState("");
	const uid = useContext(UidContext);
	const dispatch = useDispatch();

	const handleEdit = e => {
		e.preventDefault();
		if (text) {
			// j'enleve le comment.id
			dispatch(editComment(comment.id, text));
			setText("");
			setEdit(false);
		}
	};

	const handleDelete = () => {
		dispatch(deleteComment(comment.id, postId));
	};

	//USEEFFECT
	useEffect(() => {
		const checkAuthor = () => {
			if (uid === comment.UserId) {
				setIsAuthor(true);
			}
		};
		checkAuthor();
	}, [uid, comment.UserId]);

	return (
		<div className="edit-comment">
			{/* PREMIERE CONDITION */}
			{isAuthor && edit === false && (
				<span onClick={() => setEdit(!edit)}>
					<img src="./img/icons/edit.svg" alt="edit-comment" />
				</span>
			)}
			{/* FIN  PREMIERE CONDITION */}
			{/* DEUXIEME CONDITION */}
			{isAuthor && edit && (
				<form action="" onSubmit={handleEdit} className="edit-comment-form">
					<label htmlFor="text" onClick={() => setEdit(!edit)}>
						Editer
					</label>
					<br />
					<input
						type="text"
						name="text"
						onChange={e => setText(e.target.value)}
						defaultValue={comment.text}
					/>
					<br />

					{/* LA SUPPRESSION */}
					<div className="btn">
						<span
							onClick={() => {
								if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
									handleDelete();
								}
							}}
						>
							<img src="./img/icons/trash.svg" alt="delete" />
						</span>
						<input type="submit" value="Valider la modification" />
					</div>
				</form>
			)}

			{/* FIN DEUXIEME CONDITION */}
		</div>
	);
};

export default EditAndDeleteComment;
