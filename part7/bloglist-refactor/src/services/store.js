import { configureStore } from "@reduxjs/toolkit";

import notifReducer from "../reducers/notifReducer";
import blogReducer from "../reducers/blogReducer";
import loginReducer from "../reducers/loginReducer";
import usersReducer from "../reducers/usersReducer";

export const store = configureStore({
    reducer: {
        notification: notifReducer,
        blogs: blogReducer,
        login: loginReducer,
        users: usersReducer,
    },
});
