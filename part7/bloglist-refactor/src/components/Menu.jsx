import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { clearUser } from "../reducers/loginReducer";

import { Button } from "react-bootstrap";

const UserInfo = ({ user }) => {
    const dispatch = useDispatch();

    const logOut = () => {
        window.localStorage.removeItem("loggedBlogAppUser");
        dispatch(clearUser());
    };

    const style = {
        paddingRight: 10,
    };

    if (!user) {
        return null;
    } else {
        return (
            <div style={style} className="navbar-userinfo">
                <i>{user.name}</i> logged in{" "}
                <Button variant="warning" size="sm" onClick={logOut}>
                    log out
                </Button>
            </div>
        );
    }
};

const Menu = ({ user }) => {
    const padding = {
        paddingRight: 10,
        paddingLeft: 10,
    };
    const greyBackground = {
        backgroundColor: "#cccccc",
        display: "flex",
    };
    return (
        <div className="navbar" style={greyBackground}>
            <Link style={padding} to="/">
                blogs
            </Link>
            <Link style={padding} to="/users">
                users
            </Link>

            <UserInfo user={user} />
        </div>
    );
};

export default Menu;
