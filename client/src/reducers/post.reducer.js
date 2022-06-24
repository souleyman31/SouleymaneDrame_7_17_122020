//

import {
	DELETE_COMMENT,
	DELETE_POST,
	EDIT_COMMENT,
	GET_POSTS,
	UPDATE_POST
} from "../actions/post.actions";

const initialState = {};
const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return action.payload;

		case UPDATE_POST:
			return state.map(post => {
				if (post.id === action.payload.userId) {
					return {
						...post,
						message: action.payload.message
					};
				} else {
					return post;
				}
			});

		case DELETE_POST:
			return state.filter(post => post.id !== action.payload.userId);

		// case LIKE_POST:
		// 	return state.map(post => {
		// 		if (post._id === action.payload.postId) {
		// 			return {
		// 				...post,
		// 				likers: [action.payload.userId, ...post.likers]
		// 			};
		// 		}

		// 		return post;
		// 	});
		// case UNLIKE_POST:
		// 	return state.map(post => {
		// 		if (post._id === action.payload.postId) {
		// 			return {
		// 				...post,
		// 				likers: post.likers.filter(id => id !== action.payload.userId)
		// 			};
		// 		}

		// 		return post;
		// 	});

		case EDIT_COMMENT:
			return state.map(post => {
				if (post.id === action.payload.postId) {
					return {
						...post,
						comments: action.payload.comments
					};
				} else return post;
			});
		case DELETE_COMMENT:
			return state.map(post => {
				if (post.id === action.payload.postId) {
					return {
						...post,
						comments: post.Comments.filter(
							comment => comment.id !== action.payload.userId
						)
					};
				} else return post;
			});

		default:
			return state;
	}
};

export default postReducer;
