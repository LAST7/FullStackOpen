import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotificationAction(_state, action) {
            return action.payload;
        },
        removeNotificationAction(_state, _action) {
            return "";
        },
    },
});

export const { setNotificationAction, removeNotificationAction } =
    notificationSlice.actions;

export const setNotification = (message, timeout) => {
    return (dispatch) => {
        dispatch(setNotificationAction(message));
        setTimeout(() => dispatch(removeNotificationAction()), timeout * 1000);
    };
};

export default notificationSlice.reducer;
