import { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "react-bootstrap";

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
                <Button
                    size={props.btnSize}
                    variant="primary"
                    onClick={toggleVisibility}
                >
                    {props.openButtonLabel}
                </Button>
            </div>
            <div className="togglableContent" style={showWhenVisible}>
                {props.children}
                <br />
                <Button
                    size={props.btnSize}
                    variant="secondary"
                    onClick={toggleVisibility}
                >
                    {props.closeButtonLabel}
                </Button>
            </div>
        </div>
    );
};

Togglable.propTypes = {
    btnSize: PropTypes.string.isRequired,
    openButtonLabel: PropTypes.string.isRequired,
    closeButtonLabel: PropTypes.string.isRequired,
};

export default Togglable;
