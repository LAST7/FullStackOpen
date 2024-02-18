import { useState } from "react";

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notifReducer";
import { loginUser } from "../reducers/loginReducer";

import blogService from "../services/blogs";

import { Button, Form } from "react-bootstrap";

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

    const style = {
        maxWidth: 500,
    };

    return (
        <div style={style} className="login-form">
            <h2>Log in</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username: </Form.Label>
                    <Form.Control
                        id="username"
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>password: </Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <br />
                <Button type="submit" size="lg" variant="success">
                    login
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;
