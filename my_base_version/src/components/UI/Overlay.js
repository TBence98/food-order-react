import styles from "./Overlay.module.css";

const Overlay = (props) => {
    return <div onClick={props.onClick} className={styles.overlay}></div>;
};

export default Overlay;
