function createValidationRule(ruleName, errorMessage, validateFunc) {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc,
    };
}

export function requiredRule(inputName) {
    return createValidationRule(
        "required",
        `${inputName} required`,
        (inputValue) => inputValue.length !== 0
    );
}

export function minLengthRule(inputName, minCharacters) {
    return createValidationRule(
        "minLength",
        `${inputName} should contain atleast ${minCharacters} characters`,
        (inputValue) => inputValue.length >= minCharacters
    );
}

export function maxLengthRule(inputName, maxCharacters) {
    return createValidationRule(
        "minLength",
        `${inputName} cannot contain more than ${maxCharacters} characters`,
        (inputValue) => inputValue.length <= maxCharacters
    );
}

export function atSignRule(inputName) {
    return createValidationRule(
        "atSign",
        `${inputName} should contain @ sign`,
        (inputValue) => inputValue.includes("@")
    );
}
