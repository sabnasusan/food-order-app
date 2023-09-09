import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, sethttpError] = useState();
  const fetchApi = async () => {
    let data = {
      m1: {
        description: "Finest fish and veggies",
        name: "Sushi",
        price: 22.9,
      },
      m2: {
        description: "A german specialty!",
        name: "Schnitzel",
        price: 16.5,
      },
    };
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  };
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetchApi();
      const responseData = response;
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    try {
      fetchMeals();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      sethttpError(err.message);
    }
  }, []);

  if (isLoading) {
    return (
      <section className={classes.Loading}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.Loading}>
        <p>{httpError}</p>
      </section>
    );
  }
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
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
