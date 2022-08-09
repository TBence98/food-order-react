import Card from "../UI/Card";

import styles from "./WelcomeMessage.module.css";

const WelcomeMessage = () => {
    return (
        <Card className={styles["message-box"]}>
            <section>
                <h2>Delicious Food, Delivered To You</h2>
                <p>
                    Choose your fovourite meal from out broad selection of
                    available meals and enjoy a delicious lunch or dinner at
                    home.
                </p>
                <p>
                    All our meals are cooked with high-quality ingredients,
                    just-in-time and of course by experienced chefs!
                </p>
            </section>
        </Card>
    );
};

export default WelcomeMessage;
