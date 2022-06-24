//
import axios from "axios";
import { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {
	const [uid, setUid] = useState(null);
	const dispatch = useDispatch();

	//
	useEffect(() => {
		const fetchToken = async () => {
			await axios({
				method: "GET",
				url: `${process.env.REACT_APP_API_URL}/api/users/jwtid`,
				withCredentials: true
			})
				.then(res => {
					// console.log(res);
					setUid(res.data);
				})
				.catch(err => console.log("PAS DE TOKEN"));
		};
		fetchToken();
		if (uid) dispatch(getUser(uid));
	}, [uid, dispatch]);

	//
	return (
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
}

export default App;
