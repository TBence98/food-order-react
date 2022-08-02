import { useState, useCallback } from "react";

const useOrderInput = (formObj) => {
    const [form, setForm] = useState(formObj);

    const renderFormInputs = () => {
        return Object.values(form).map((inputObj) => {
            const { value, label, errorMessage, valid, renderInput } = inputObj;
            return renderInput(
                onInputChange,
                value,
                valid,
                errorMessage,
                label
            );
        });
    };

    const isValidInput = useCallback((inputField) => {
        for (const rule of inputField.validationRules) {
            if (!rule.validate(inputField.value)) {
                inputField.errorMessage = rule.message;
                return false;
            }
        }
        return true;
    }, []);

    const onInputChange = (event) => {
        const { name, value } = event.target;

        const inputObj = { ...form[name] };

        inputObj.value = value;
        inputObj.valid = isValidInput(inputObj);

        inputObj.touched = true;

        setForm((prevForm) => {
            return { ...prevForm, [name]: inputObj };
        });
    };

    const isFormValid = () => {
        for (let input in form) {
            if (!form[input].valid) {
                return false;
            }
        }
        return true;
    };

    const createAddressObj = () => {
        return Object.values(form).reduce((orderObj, inputObj) => {
            orderObj[inputObj.label] = inputObj.value;
            return orderObj;
        }, {});
    };

    return {
        renderFormInputs,
        isFormValid,
        createAddressObj,
    };
};

export default useOrderInput;
