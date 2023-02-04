
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from './pages/PageNotFound'
import AddOrder from "./pages/AddOrder";
import ListOrder from "./pages/ListOrder";

import { useDispatch, useSelector } from 'react-redux';
// import { userLogin } from '../store/actions/authAction';
// import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


function App() {

	const { loading, successMessage, error, authenticate, myInfo } = useSelector(state => state.auth)

	console.log(myInfo)
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Login  />} />
				<Route path="*" exact element={<NotFound  />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/signup" exact element={<Signup />} />
				{/* <Route path="/addorder" exact element={<AddOrder />} />
				<Route path="/listorder" exact element={<ListOrder />} /> */}
				{authenticate? <Route path="/addorder" exact element={<AddOrder />} /> :
				<Route path="/addorder" element={<Navigate replace to="/login" />} />}

				{authenticate ? <Route path="/listorder" exact element={<ListOrder />} /> :
				<Route path="/listorder" element={<Navigate replace to="/login" />} />}
			</Routes>
		</BrowserRouter>
  );
}

export default App;
