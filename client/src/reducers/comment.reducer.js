import { DELETE_COMMENT, EDIT_COMMENT, GET_COMMENTS } from "../actions/comment.actions";

//

const initialState = {};
const commentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMENTS:
			return action.payload;
		case EDIT_COMMENT:
			return state.map(comment => {
				if (comment.id === action.payload.postId) {
					return {
						...comment,
						comments: action.payload.comments
					};
				} else return comment;
			});
		case DELETE_COMMENT:
			return state.map(comment => {
				if (comment.id === action.payload.postId) {
					return {
						...comment,
						comments: comment.filter(com => com.id !== action.payload.userId)
					};
				} else return comment;
			});

		default:
			return state;
	}
};

export default commentReducer;
