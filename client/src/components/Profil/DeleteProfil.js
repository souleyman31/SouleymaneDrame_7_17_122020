import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

const DeleteProfil = props => {
	const dispatch = useDispatch();
	const onDelete = () => dispatch(deleteUser(props.id));

	return (
		<div
			onClick={() => {
				if (window.confirm("Souhaitez-vous supprimer votre profil?")) {
					onDelete();
				}
			}}
		>
			<img src="./img/icons/trash.svg" alt="corbeille" />
		</div>
	);
};

export default DeleteProfil;
