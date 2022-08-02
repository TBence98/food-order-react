import React from "react";

import classes from "./OrderInput.module.css";

const OrderInput = (props) => {
    const { label, type, name, handleChange, errorMessage, isValid, value } =
        props;
    return (
        <p className={classes["input-container"]}>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
            />
            {errorMessage && !isValid && (
                <span className={classes["error-text"]}>{errorMessage}</span>
            )}
        </p>
    );
};

export default React.memo(OrderInput);
