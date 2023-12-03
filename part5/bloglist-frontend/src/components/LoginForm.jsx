import { useState } from "react";

import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({ setNotice, setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (ev) => {
        ev.preventDefault();

        try {
            // perfrom the login action
            const user = await loginService.login({ username, password });
            setUser(user);
            // store the user info
            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user),
            );
            blogService.setToken(user.token);

            // empty the input field
            setUsername("");
            setPassword("");
        } catch (exception) {
            console.error(exception);
            setNotice({
                msg: "wrong username or password",
                type: "error",
            });
            setTimeout(() => {
                setNotice({
                    msg: null,
                    type: null,
                });
            }, 5000);
        }

        console.log(`logining in with ${username}: ${password}`);
    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div className="input" id="input-username">
                    username:{" "}
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className="input" id="input-password">
                    password:{" "}
                    <input
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
