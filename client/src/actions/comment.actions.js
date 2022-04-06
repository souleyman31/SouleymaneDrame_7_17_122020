import axios from "axios";

//
export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = " EDIT_COMMENT";
export const DELETE_COMMENT = " DELETE_COMMENT";

//GET COMMENTS
export const getComments = num => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}/api/comments`)
			.then(res => {
				const array = res.data.slice(0, num);
				dispatch({ type: GET_COMMENTS, payload: array });
			})
			.catch(err => console.log(err));
	};
};

//ADD COMMENT
export const addComment = (postId, posterId, userId, comments) => {
	return dispatch => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/posts/post-comment/${postId}`,
			data: { posterId, userId, comments }
		})
			.then(res => {
				dispatch({ type: ADD_COMMENT, payload: { postId } });
			})
			.catch(err => console.log(err));
	};
};

//EDIT COMMENT (j'enleive le userId)
export const editComment = (postId, comments) => {
	return dispatch => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/posts/put-comment/${postId}`,
			data: { comments }
		})
			.then(res => {
				dispatch({ type: EDIT_COMMENT, payload: { postId, comments } });
			})
			.catch(err => console.log(err));
	};
};

//DELETE COMMENT
export const deleteComment = (postId, userId) => {
	return dispatch => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/posts/delete-comment/${postId}`,
			data: { userId }
		})
			.then(res => {
				dispatch({ type: DELETE_COMMENT, payload: { postId, userId } });
			})
			.catch(err => console.log(err));
	};
};
