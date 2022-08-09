import { useContext } from "react";
import CartContext from "../../store/cart-context";
import styles from "./CartButton.module.css";
import OvalButton from "../UI/OvalButton";

const CartButton = () => {
    const ctx = useContext(CartContext);

    let disabled = true;
    if (ctx.itemsInCart > 0) {
        disabled = false;
    }

    return (
        <div className={styles.root}>
            <OvalButton
                onClick={ctx.enableModal}
                className={styles["cart-button"]}
                disabled={disabled}
            >
                Your Cart
                <span className={styles["cart-counter"]}>
                    {ctx.itemsInCart}
                </span>
            </OvalButton>
        </div>
    );
};

export default CartButton;
