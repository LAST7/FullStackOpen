import { useState } from "react";

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notifReducer";
import { loginUser } from "../reducers/loginReducer";

import blogService from "../services/blogs";

const LoginForm = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (ev) => {
        ev.preventDefault();

        dispatch(loginUser(username, password))
            .then((user) => {
                // sotre the user info
                window.localStorage.setItem(
                    "loggedBlogAppUser",
                    JSON.stringify(user),
                );
                blogService.setToken(user.token);
                // empty the input field
                setUsername("");
                setPassword("");
            })
            .catch((err) => {
                console.error(err);
                // notify the user about the error
                dispatch(
                    setNotification("wrong username or password", "error", 5),
                );
            });

        // console.log(`logining in with ${username}: ${password}`);
    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div className="input" id="input-username">
                    username:{" "}
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className="input" id="input-password">
                    password:{" "}
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" className="button" id="button-login">
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
