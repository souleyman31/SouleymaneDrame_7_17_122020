import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

//
import routeReducer from "./reducers";
import thunk from "redux-thunk";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";

//

const store = createStore(routeReducer, composeWithDevTools(applyMiddleware(thunk)));

//
store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
