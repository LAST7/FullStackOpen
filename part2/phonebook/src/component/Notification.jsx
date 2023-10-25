const Notification = ({ notice }) => {
    if (!notice.msg) {
        return null;
    }

    let noticeStyle = {
        backgroundColor: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
    };

    if (notice.type === "add") {
        noticeStyle = { ...noticeStyle, color: "green" };
    } else if (notice.type === "error") {
        noticeStyle = { ...noticeStyle, color: "red" };
    }

    return <div style={noticeStyle}>{notice.msg}</div>;
};

export default Notification;
