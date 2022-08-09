import styles from "./OvalButton.module.css";

const OvalButton = (props) => {
    return (
        <button
            type={props.type || "button"}
            disabled={props.disabled}
            onClick={props.onClick}
            className={`${styles.ovalButton} ${props.className}`}
        >
            {props.children}
        </button>
    );
};

export default OvalButton;
