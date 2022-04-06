import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const LikeButton = ({ post }) => {
	const [liked, setLiked] = useState(false);
	const uid = useContext(UidContext);

	const like = () => {};
	const unlike = () => {};

	//USEEFFECT
	useEffect(() => {
		if (post.likers.includes(uid)) setLiked(true);
		else setLiked(false);
	}, [uid, post.likers, liked]);

	return (
		<>
			<div className="like-container">
				{uid === null && (
					<Popup
						trigger={<img src="./img/icons/heart.svg" alt="like" />}
						position={["bottom center", "bottom right", "bottom left"]}
						closeOnDocumentClick
					>
						<div>Connectez-vous pour aimer un post !</div>
					</Popup>
				)}

				{uid && liked === false && (
					<img src="./img/icons/heart.svg" onClick={like} alt="like" />
				)}

				{uid && liked && (
					<img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
				)}
				<span>{post.likers.length}</span>
			</div>
		</>
	);
};

export default LikeButton;
