import { useContext, useRef } from "react";
import CartContext from "../../store/cart-context";
import styles from "./MealListItem.module.css";
import OvalButton from "../UI/OvalButton";

const MealListItem = (props) => {
    const ctx = useContext(CartContext);
    const input = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const count = +input.current.value;
        const price = props.mealPrice;
        ctx.addItemAmount(props.mealName, price, count);
        input.current.value = "";
    };

    return (
        <li className={styles["meal-item"]}>
            <div className={styles["meal-infos"]}>
                <h4>{props.mealName}</h4>
                <p className={styles["meal-desc"]}>{props.mealDescription}</p>
                <p className={styles.price}>${props.mealPrice}</p>
            </div>
            <form onSubmit={submitHandler} className={styles.order}>
                <label htmlFor="count">Amount</label>
                <input type="number" id="count" min="1" ref={input} />
                <OvalButton type="submit">+ Add</OvalButton>
            </form>
        </li>
    );
};

export default MealListItem;
