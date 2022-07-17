import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";

import Main from "./Pages/Main";
import Login from "./Pages/SignIn"
import Register from "./Pages/SignUp"

function ProtectedRoutes({ redirectTo }){
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
  }

function MyRoutes() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                
                <Route element={<ProtectedRoutes redirectTo={'/'}/>}>
                    <Route path="/main" element={<Main />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default MyRoutes;
