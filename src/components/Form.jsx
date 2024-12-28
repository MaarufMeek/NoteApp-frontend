import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api.js";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import "../styles/form.css"


function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            const res = await api.post(route, {username, first_name, last_name, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }


    const name = method === "login" ? "Login" : "SignUp Now"

    return (
        <>
            <div className="containers">
                <div className="edit-container ">
                    <form className="edit-form" onSubmit={handleSubmit}>
                        <h1>{name}</h1>
                        <div className="form-fields">
                            <input
                                className="edit-input"
                                type="text"
                                value={username}
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>
                        {
                            method === "register" &&
                            <>
                                <div className="form-fields">
                                    <input
                                        className="edit-input"
                                        type="text"
                                        value={first_name}
                                        placeholder="Firstname"
                                        onChange={(e) => setFirst_name(e.target.value)}
                                    />
                                </div>
                                <div className="form-fields">
                                    <input
                                        className="edit-input"
                                        type="text"
                                        value={last_name}
                                        placeholder="Lastname"
                                        onChange={(e) => setLast_name(e.target.value)}
                                    />
                                </div>
                            </>
                        }

                        <div className="form-fields">
                            <input
                                className="edit-input"
                                type="text"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="edit-submit mt-3"
                                type="submit">{
                            loading ? <span className="spinner-border spinner-border-md" role="status"
                                            aria-hidden="true"></span>
                                : method === "login" ? "Login" : "Register"
                        }
                        </button>
                        <div className="link">
                            {method === "register" ? <Link to="/login">Go to Login</Link> :
                                <Link to="/register">Sign Up</Link>}
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}


export default Form;