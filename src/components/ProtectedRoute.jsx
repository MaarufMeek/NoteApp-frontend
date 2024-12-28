import {Navigate, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import {useEffect, useState} from "react";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import api from "../api.js";


function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post(
                'api/token/refresh/',
                {refresh: refreshToken}
            );
            if(res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
                handleLogout();
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
            handleLogout();
        }
    }
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.clear();
        navigate('/login')
    }

    //checks for access token, refreshes it if expires. redirects to login if cannot refresh or expired token
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false)
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenExp < currentTime) {
            await refreshToken();
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;