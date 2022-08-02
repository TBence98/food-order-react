import { useContext } from "react";

import useOrderInput from "../hooks/useOrderInput";
import { orderForm } from "../utils/formConfig";
import CartContext from "../../store/cart-context";

import classes from "./OrderForm.module.css";

const OrderForm = (props) => {
    const cartCtx = useContext(CartContext);

    const { renderFormInputs, isFormValid, createAddressObj } =
        useOrderInput(orderForm);

    // Convert cartCtx.items array to a more ideal
    // object format
    const createOrderObj = () => {
        const orders = cartCtx.items.reduce((obj, item) => {
            obj[item.id] = item;
            delete obj[item.id].id;
            return obj;
        }, {});

        return {
            address: createAddressObj(),
            orders,
        };
    };

    const confirmHandler = (event) => {
        event.preventDefault();
        props.onConfirm(createOrderObj());
    };

    return (
        <form onSubmit={confirmHandler}>
            {renderFormInputs()}
            <div className={classes.actions}>
                <button
                    type="button"
                    className={classes["button--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                <button
                    disabled={!isFormValid()}
                    className={classes.button}
                    type="submit"
                >
                    Order
                </button>
            </div>
        </form>
    );
};

export default OrderForm;
