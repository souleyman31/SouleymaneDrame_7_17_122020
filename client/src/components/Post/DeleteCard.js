import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = props => {
	const dispatch = useDispatch();

	const onDelete = () => dispatch(deletePost(props.id));
	return (
		<div
			onClick={() => {
				if (window.confirm("Souhaitez-vous supprimer ce commentaire?")) {
					onDelete();
				}
			}}
		>
			<img src="./img/icons/trash.svg" alt="corbeille" />
		</div>
	);
};

export default DeleteCard;
