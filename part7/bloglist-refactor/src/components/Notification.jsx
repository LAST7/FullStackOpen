import { useSelector } from "react-redux";

const Notification = () => {
    const notice = useSelector((state) => state.notification);

    // dont render anything if there's no notif
    if (notice.msg === "") {
        return null;
    }

    // basic style
    let noticeStyle = {
        backgroundColor: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
    };

    // validate the type of the `notice` object
    const validTypes = ["add", "error"];
    console.assert(
        validTypes.includes(notice.type),
        `invalid notice type: ${notice.type}`,
    );
    // change color according to notif type
    if (notice.type === "add") {
        noticeStyle = { ...noticeStyle, color: "green" };
    } else if (notice.type === "error") {
        noticeStyle = { ...noticeStyle, color: "red" };
    }

    return (
        <div className="notification" style={noticeStyle}>
            {notice.msg}
        </div>
    );
};

export default Notification;
