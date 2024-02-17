import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsersAction(_state, action) {
            return action.payload;
        },
    },
});

export const { setUsersAction } = usersSlice.actions;

export const initUsers = () => {
    return async (dispatch) => {
        const fetechedUsers = await userService.getAll();

        dispatch(setUsersAction(fetechedUsers));
    };
};

export default usersSlice.reducer;
