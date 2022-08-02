import { useState, useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const [isOrdered, setIsOrdered] = useState(false);
    const [isSendingData, setIsSendingData] = useState(false);
    const [error, setError] = useState();
    const [isSubmited, setIsSubmited] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    // show the orderForm
    const orderHandler = () => {
        if (cartCtx.items.length > 0) {
            setIsOrdered(true);
        } else {
            alert("Cart is empty!");
        }
    };

    const confirmedOrderHandler = (orderData) => {
        setIsSubmited(true);
        setIsSendingData(true);
        setError(false);

        fetch(
            "https://react-http-14562-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
            {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(() => {
                cartCtx.resetItems();
            })
            .catch((error) => {
                setError("Something went wrong...");
                console.error(error);
            })
            .finally(() => {
                setIsSendingData(false);
            });
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const closeAction = (
        <div className={classes.actions}>
            <button
                type="button"
                className={classes.button}
                onClick={props.onClose}
            >
                Close
            </button>
        </div>
    );

    if (error) {
        return (
            <Modal>
                <div className={classes.message}>
                    <p>{error}</p>
                </div>
                {closeAction}
            </Modal>
        );
    }

    if (isSendingData) {
        return (
            <Modal>
                <div className={classes.message}>
                    <p>Sending data...</p>
                </div>
                {closeAction}
            </Modal>
        );
    }

    if (isSubmited) {
        return (
            <Modal>
                <div className={classes.message}>
                    <p>Successful Order!</p>
                </div>
                {closeAction}
            </Modal>
        );
    }

    if (isOrdered) {
        return (
            <Modal>
                <OrderForm
                    onConfirm={confirmedOrderHandler}
                    onClose={props.onClose}
                />
            </Modal>
        );
    }

    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    type="button"
                    className={classes["button--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                <button
                    className={classes.button}
                    type="button"
                    onClick={orderHandler}
                >
                    Order
                </button>
            </div>
        </Modal>
    );
};

export default Cart;
