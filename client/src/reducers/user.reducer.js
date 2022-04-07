// APRES MULTER
//

import {
	GET_USER,
	UPLOAD_PICTURE,
	UPDATE_BIO,
	FOLLOW_USER,
	UNFOLLOW_USER,
	DELETE_USER
} from "../actions/user.actions";

const initialState = {};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return action.payload;
		case UPDATE_BIO:
			return {
				...state,
				bio: action.payload
			};

		case UPLOAD_PICTURE:
			return {
				...state,
				picture: action.payload
			};
		case FOLLOW_USER:
			return {
				...state,
				following: [action.payload.idToFollow, ...state.following]
			};
		case UNFOLLOW_USER:
			return {
				...state,
				following: state.following.filter(id => id !== action.payload.idToUnFollow)
			};
		case DELETE_USER:
			return state.filter(post => post.id !== action.payload.userId);

		default:
			return state;
	}
};

export default userReducer;
