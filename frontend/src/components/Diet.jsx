import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";

export default function Diet() {
    let loggedData = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date());
    let [total, setTotal] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0,
    });

    useEffect(() => {
        let formattedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${formattedDate}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setItems(data);
            calculateTotal(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [date, loggedData]); // Re-fetch data when `date` changes

    function calculateTotal(data) {
        let totalCopy = {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalFiber: 0,
        };

        data.forEach((item) => {
            totalCopy.totalCalories += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fats;
            totalCopy.totalFiber += item.details.fiber;
        });

        setTotal(totalCopy);
    }

    function handleDateChange(event) {
        let newDate = new Date(event.target.value);
        newDate.setHours(0, 0, 0, 0); // Normalize time
        setDate(newDate);
    }

    return (
        <section className="container diet-container">
            <Header />

            <input type="date" onChange={handleDateChange} />

            {items.map((item, index) => (
                <div className="item" key={index}>
                    <h3>{item.foodId.name} ({item.details.calories} kcal for {item.quantity}g)</h3>
                    <p>Protein {item.details.protein}g | Carbs {item.details.carbohydrates}g | Fats {item.details.fats}g | Fiber {item.details.fiber}g</p>
                </div>
            ))}

            <div className="item">
                <h3>({total.totalCalories} kcal)</h3>
                <p>Protein {total.totalProtein}g | Carbs {total.totalCarbs}g | Fats {total.totalFats}g | Fiber {total.totalFiber}g</p>
            </div>
        </section>
    );
}
