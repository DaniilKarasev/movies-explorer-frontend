import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
	component: Component,
	...props
}) => {
	return (
		props.loggedIn ? <Component {...props} /> : <Navigate replace to='/' />
	)
}

export default ProtectedRoute; 