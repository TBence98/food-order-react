import { useState } from "react";
import Card from "../UI/Card";
import MealListItem from "./MealListItem";

import styles from "./MealsList.module.css";

const MealsList = () => {
    const [listOfMeals, setListOfMeals] = useState([
        {
            name: "Sushi",
            description: "Finest fish and veggies",
            price: 22.99,
        },
        {
            name: "Schnitzel",
            description: "A german speciality!",
            price: 16.5,
        },
        {
            name: "Barbecue Burger",
            description: "American, raw, meaty",
            price: 12.99,
        },
        {
            name: "Green Bowl",
            description: "Healthy...and green...",
            price: 18.99,
        },
    ]);

    const mealList = listOfMeals.map((meal) => (
        <MealListItem
            mealName={meal.name}
            mealDescription={meal.description}
            mealPrice={meal.price}
            key={Math.random()}
        />
    ));

    return (
        <Card className={styles["meal-list"]}>
            <main>{mealList}</main>
        </Card>
    );
};

export default MealsList;
