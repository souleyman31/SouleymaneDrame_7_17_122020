//On va importer l'index de USERS REDUCER DANS INDEX/SRC POUR FAIRE LE STORE.DISPATCH

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
