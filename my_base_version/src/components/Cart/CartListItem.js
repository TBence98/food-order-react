import styles from "./CartListItem.module.css";

const CartListItem = (props) => {
    return (
        <li className={styles["list-item"]}>
            <div className={styles["item-infos"]}>
                <h3>{props.name}</h3>
                <p className={styles.price}>${props.price}</p>
                <p className={styles.counter}>
                    <span>x {props.counter}</span>
                </p>
            </div>
            <div className={styles.controls}>
                <button
                    onClick={() => props.onRemove(props.name)}
                    className={styles["control-button"]}
                    type="button"
                >
                    -
                </button>
                <button
                    onClick={() => props.onAdd(props.name)}
                    className={styles["control-button"]}
                    type="button"
                >
                    +
                </button>
            </div>
        </li>
    );
};

export default CartListItem;
