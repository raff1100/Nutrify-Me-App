import Header from "./Header";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react"; // Merged imports
import Food from "./Food";

export default function Track() {
    const loggedData = useContext(UserContext);
    const [foodItems, setFoodItems] = useState([]);
    const [food, setFood] = useState(null);

    function searchFood(event) {
        if (event.target.value !== "") {
            fetch(`http://localhost:8000/foods/${event.target.value}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + loggedData.loggedUser.token, // Fixed missing space after "Bearer"
                },
            })
            .then((res) => res.json()) // Fixed incorrect function syntax
            .then((data) => {
                if (data.msg === undefined) {
                    setFoodItems(data);
                } else {
                    setFoodItems([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            setFoodItems([]); // Clear foodItems when input is empty
        }
    }

    function displayItem(item) { // Fixed missing function definition for selecting food
        setFood(item);
    }

    return (
        <>
            
            <section className="container track-container">
            <Header /> 
                <div className="search">
                    <input className="search-inp" onChange={searchFood} type="search"
                    placeholder="Search Food Item" />
                    {foodItems.length !== 0 ? (
                        <div className="search-results">
                            {foodItems.map((item) => (
                                <p className="item" key={item._id} onClick={() => displayItem(item)}> {/* Added onClick to set selected food */}
                                    {item.name} 
                                </p>
                            ))}
                        </div>
                    ) : null}
                </div>
                
                {food !== null ? <Food food={food} /> : null}
            </section>
        </>
    );
}
