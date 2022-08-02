import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

/* const DUMMY_MEALS = [
    {
        id: "m1",
        name: "Sushi",
        description: "Finest fish and veggies",
        price: 22.99,
    },
    {
        id: "m2",
        name: "Schnitzel",
        description: "A german specialty!",
        price: 16.5,
    },
    {
        id: "m3",
        name: "Barbecue Burger",
        description: "American, raw, meaty",
        price: 12.99,
    },
    {
        id: "m4",
        name: "Green Bowl",
        description: "Healthy...and green...",
        price: 18.99,
    },
]; */

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    "https://react-http-14562-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
                );

                if (!response.ok) {
                    setError("Something went wrong...");
                    throw new Error(
                        "Something went wrong! Status: " + response.status
                    );
                }

                const data = await response.json();
                const mealsArr = [];

                for (const meal in data) {
                    mealsArr.push({ id: meal, ...data[meal] });
                }

                setMeals(mealsArr);
            } catch (error) {
                console.error(error.message);
            }
            setIsLoading(false);
        })();
    }, []);

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            {!isLoading && !error && (
                <Card>
                    <ul>{mealsList}</ul>
                </Card>
            )}
            {isLoading && <p className={classes["loading-text"]}>Loading...</p>}
            {error && <p className={classes["error-text"]}>{error}</p>}
        </section>
    );
};

export default AvailableMeals;
