import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import Blogs from "./components/Blogs";

import blogService from "./services/blogs";

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [notice, setNotice] = useState({
        msg: null,
        type: null,
    });

    // get the blogs stored on the server
    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    // get the login info
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const logOut = () => {
        window.localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
    };

    // conditional rendering
    if (user === null) {
        return (
            <Togglable openButtonLabel="login" closeButtonLabel="cancel">
                <Notification notice={notice} />
                <LoginForm setNotice={setNotice} setUser={setUser} />
            </Togglable>
        );
    } else {
        return (
            <div>
                <br />
                <Notification notice={notice} />
                <h2>Blogs</h2>
                <p>
                    {user.name} logged in{" "}
                    <button onClick={logOut}>log out</button>
                </p>
                <Togglable openButtonLabel="new blog" closeButtonLabel="cancel">
                    <BlogForm
                        blogs={blogs}
                        setBlogs={setBlogs}
                        username={user.username}
                        setNotice={setNotice}
                    />
                </Togglable>
                <br />
                <Blogs blogs={blogs} setBlogs={setBlogs} />
            </div>
        );
    }
};

export default App;
