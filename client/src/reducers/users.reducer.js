import { GET_USERS } from "../actions/users.actions";

//
const initialState = {};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return action.payload;

		default:
			return state;
	}
};
export default usersReducer;
