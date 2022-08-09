import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import CartButton from "../Cart/CartButton";
import WelcomeMessage from "./WelcomeMessage";

const Header = () => {
    return (
        <>
            <header className={styles.Header}>
                <h1>ReactMeals</h1>
                <CartButton />
            </header>
            <div>
                <img
                    src={mealsImg}
                    alt="Delicious meals"
                    className={styles["header-img"]}
                />
            </div>
            <WelcomeMessage />
        </>
    );
};

export default Header;
