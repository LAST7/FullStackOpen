import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Menu from "./components/Menu";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";

import blogService from "./services/blogs";
import { initBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/loginReducer";
import { initUsers } from "./reducers/usersReducer";

const App = () => {
    const dispatch = useDispatch();

    // get the blogs stored on the server and dispatch them to store
    useEffect(() => {
        dispatch(initBlog());
        dispatch(initUsers());
    }, []);

    // get the login info
    useEffect(() => {
        const localUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (localUserJSON) {
            const localUser = JSON.parse(localUserJSON);
            dispatch(setUser(localUser));
            blogService.setToken(localUser.token);
        }
    }, []);

    const currentUser = useSelector((state) => state.login);

    // logged in / not
    if (currentUser === null) {
        return (
            <div className="container">
                <Togglable
                    btnSize="lg"
                    openButtonLabel="login"
                    closeButtonLabel="cancel"
                >
                    <Notification />
                    <LoginForm />
                </Togglable>
            </div>
        );
    } else {
        return (
            <div className="container">
                <Menu user={currentUser} />

                <br />
                <Notification />

                <Routes>
                    <Route path="*" element={<Blogs />} />
                    <Route path="/users/*" element={<Users />} />
                </Routes>
                <br />
            </div>
        );
    }
};

export default App;
