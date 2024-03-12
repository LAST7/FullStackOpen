import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        setUserAction(_state, action) {
            return action.payload;
        },
        clearUserAction(_state, _action) {
            return null;
        },
    },
});

const { setUserAction, clearUserAction } = loginSlice.actions;

/**
 * Sets the current operating user to the store.
 * Use this function when the user object is read from the local storage.
 *
 * @param {object} user - The user object stored in local storage
 * @returns {void} This function does not return anything.
 */
export const setUser = (user) => {
    return (dispatch) => {
        dispatch(setUserAction(user));
    };
};

/**
 * Perform the login operation and set the current operating user to the store.
 * Note that this action creator is not responsible for either storing the token to the local storage or set token in blog service.
 * Use this function when logging in.
 *
 * @param {string} username - username
 * @param {string} password - the unencrypted password
 * @returns {Promise<Object>} A Promise that resolves with the user object upon successful login.
 */
export const loginUser = (username, password) => {
    return async (dispatch) => {
        // WARN: should use then & catch
        const user = await loginService.login({ username, password });

        dispatch(setUserAction(user));
        return user;
    };
};

/**
 * Clear the current logged in user from the store.
 * Use this function when logging out.
 *
 * @returns {void}
 */
export const clearUser = () => {
    return (dispatch) => {
        dispatch(clearUserAction());
    };
};

export default loginSlice.reducer;
