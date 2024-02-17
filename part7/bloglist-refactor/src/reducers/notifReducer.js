import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
    name: "notification",
    initialState: {
        msg: "",
        type: null,
    },
    reducers: {
        setNotifAction(_state, action) {
            return action.payload;
        },
        removeNotifAction(_state, _action) {
            return {
                msg: "",
                type: null,
            };
        },
    },
});

export const { setNotifAction, removeNotifAction } = notifSlice.actions;

/**
 * send a notification to the user
 *
 * @param {string} msg - the message which would be shown
 * @param {string} type - the type of the message, could be "add"/"error"
 * @param {number} timeout - the time that the message should occur(in second)
 *
 * @returns {Promise<void>} A Promise that resolves once the notification and the timer is successfully added
 */
export const setNotification = (msg, type, timeout) => {
    return (dispatch) => {
        dispatch(
            setNotifAction({
                msg,
                type,
            }),
        );
        setTimeout(() => dispatch(removeNotifAction()), timeout * 1000);
    };
};

export default notifSlice.reducer;
