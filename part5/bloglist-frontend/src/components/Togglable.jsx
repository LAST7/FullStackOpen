import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>
                    {props.openButtonLabel}
                </button>
            </div>
            <div className="togglableContent" style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>
                    {props.closeButtonLabel}
                </button>
            </div>
        </div>
    );
};

Togglable.propTypes = {
    openButtonLabel: PropTypes.string.isRequired,
    closeButtonLabel: PropTypes.string.isRequired,
};

export default Togglable;
