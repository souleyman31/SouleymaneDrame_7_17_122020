import axios from "axios";

//
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POSTS";
export const UNLIKE_POST = "UNLIKE_POSTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_POST = "ADD_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS";

//GET POSTS
export const getPosts = num => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}/api/posts`)
			.then(res => {
				const array = res.data.slice(0, num);
				dispatch({ type: GET_POSTS, payload: array });
			})
			.catch(err => console.log(err));
	};
};

//UPDATE POST
export const updatePost = (userId, message) => {
	return dispatch => {
		return axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API_URL}/api/posts/${userId}`,
			data: { message }
		})
			.then(res => {
				dispatch({ type: UPDATE_POST, payload: { message, userId } });
			})
			.catch(err => console.log(err));
	};
};

//DELETE POST
export const deletePost = userId => {
	return dispatch => {
		return axios({
			method: "DELETE",
			url: `${process.env.REACT_APP_API_URL}/api/posts/${userId}`
		})
			.then(res => {
				dispatch({ type: DELETE_POST, payload: { userId } });
			})
			.catch(err => console.log(err));
	};
};

//LIKE POST
export const likePost = (postId, userId) => {
	return dispatch => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/posts/like/` + postId,
			data: { id: userId }
		})
			.then(res => {
				dispatch({ type: LIKE_POST, payload: { postId, userId } });
			})
			.catch(err => console.log(err));
	};
};

//UNLIKE POST
export const unlikePost = (postId, userId) => {
	return dispatch => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}/api/posts/unlike/` + postId,
			data: { id: userId }
		})
			.then(res => {
				dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
			})
			.catch(err => console.log(err));
	};
};

//ADD COMMENT (on met dans le payload juste postId pcq on aura besoin de l'id pour rajouter les comments)
export const addComment = (postId, userId, posterId, comments) => {
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

//EDIT COMMENT
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

//ADD MESSAGE POST
export const addPost = data => {
	return dispatch => {
		return axios.post(`${process.env.REACT_APP_API_URL}/api/posts/`, data).then(res => {
			if (res.data.error) {
				dispatch({ type: GET_POST_ERRORS, payload: res.data.error });
			} else {
				dispatch({ type: GET_POST_ERRORS, payload: "" });
			}
		});
	};
};
//ADD IMAGE POST
export const addPostPicture = data => {
	return dispatch => {
		return axios.post(`${process.env.REACT_APP_API_URL}/api/posts/upload`, data).then(res => {
			if (res.data.error) {
				dispatch({ type: GET_POST_ERRORS, payload: res.data.error });
			} else {
				dispatch({ type: GET_POST_ERRORS, payload: "" });
			}
		});
	};
};
