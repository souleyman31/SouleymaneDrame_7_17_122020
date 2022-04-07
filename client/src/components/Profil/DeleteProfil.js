import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

const DeleteProfil = () => {
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	const onDelete = () => dispatch(deleteUser(userData.id));

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
