import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {

    function Logout() {
        localStorage.clear();
        return <Navigate to="/login" replace/>
    }
    function RegisterAndLogout() {
        localStorage.clear();
        return <Register />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home logout={Logout}/>
                    </ProtectedRoute>
                }/>
                <Route path="/login" element={<Login />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/register" element={<RegisterAndLogout />}/>
                <Route path="*" element={<NotFound  />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
