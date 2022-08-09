import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Overlay from "../UI/Overlay";
import Card from "../UI/Card";
import CartListItem from "./CartListItem";
import OvalButton from "../UI/OvalButton";

import styles from "./CartModal.module.css";

const CartModal = () => {
    const ctx = useContext(CartContext);

    const cartList = ctx.cartList.map((item) => (
        <CartListItem
            name={item.name}
            price={item.price}
            counter={item.count}
            key={Math.random()}
            onAdd={ctx.addItem}
            onRemove={ctx.removeItem}
        />
    ));

    const totalAmount = ctx.cartList.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    return (
        <>
            <Overlay onClick={ctx.disableModal} />
            <Card className={styles["cart-modal"]}>
                {cartList}
                <div className={styles.total}>
                    <h3>Total Amount</h3>
                    <p>${totalAmount.toFixed(2)}</p>
                </div>
                <div className={styles["control-btns"]}>
                    <OvalButton
                        className={`${styles["first-btn"]} ${styles.btn}`}
                        onClick={ctx.disableModal}
                    >
                        Close
                    </OvalButton>
                    <OvalButton className={styles.btn}>Order</OvalButton>
                </div>
            </Card>
        </>
    );
};

export default CartModal;
