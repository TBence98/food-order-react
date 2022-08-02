import React from "react";
import OrderInput from "../UI/OrderInput";

import {
    requiredRule,
    minLengthRule,
    maxLengthRule,
    atSignRule,
} from "./inputValidationRules";

function createFormFieldConfig(label, name, type, defaultValue = "") {
    return {
        renderInput: (handleChange, value, isValid, error, key) => {
            return (
                <OrderInput
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    value={value}
                    handleChange={handleChange}
                    errorMessage={error}
                />
            );
        },
        label,
        value: defaultValue,
        valid: false,
        errorMessage: "",
        touched: false,
    };
}

// object representation of order form
export const orderForm = {
    FirstName: {
        ...createFormFieldConfig("First Name", "FirstName", "text"),
        validationRules: [
            requiredRule("First name"),
            minLengthRule("First name", 3),
            maxLengthRule("First name", 25),
        ],
    },
    LastName: {
        ...createFormFieldConfig("Last Name", "LastName", "text"),
        validationRules: [
            requiredRule("Last name"),
            minLengthRule("Last name", 3),
            maxLengthRule("Last name", 25),
        ],
    },
    email: {
        ...createFormFieldConfig("Email", "email", "email"),
        validationRules: [
            requiredRule("Email"),
            atSignRule("Email"),
            minLengthRule("Email", 10),
            maxLengthRule("Email", 25),
        ],
    },
    city: {
        ...createFormFieldConfig("City", "city", "text"),
        validationRules: [
            requiredRule("City"),
            minLengthRule("City", 3),
            maxLengthRule("City", 20),
        ],
    },
    street: {
        ...createFormFieldConfig("Street", "street", "text"),
        validationRules: [
            requiredRule("Street"),
            minLengthRule("Street", 3),
            maxLengthRule("Street", 30),
        ],
    },
};
