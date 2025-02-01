import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
export default function Login() {

    const loggedData = useContext(UserContext);

    const navigate = useNavigate();

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: ""
    });

    const [message,setMessage] = useState({
        type:"invisble",
        text:""
    })

    function handleInput(event) {
        setUserCreds((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userCreds);

        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if(res.status===404){
                setMessage({type:"error",text:"username or email does not exist"})
            }
            else if(res.status===403){
                setMessage({type:"error",text:"incorrect password"})
            }
            else if(res.status===200){
                return res.json();
            }
            setTimeout(()=>{
                setMessage({type:"invisble",text:""})
            },5000)
        })
        .then((data) => {
            
            if(data.token!=undefined){
                localStorage.setItem("nutrify-user",JSON.stringify(data));
                loggedData.setLoggedUser(data);
                navigate("/track")
            }
            
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <section className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login to Nutrify-Me!</h1>
                <input className="inp" type="email" required placeholder="Enter Email" name="email" onChange={handleInput} value={userCreds.email} />
                <input className="inp" type="password" required placeholder="Enter Password" name="password" onChange={handleInput} value={userCreds.password} />
                <button className="btn">Login</button>
                <p>Do not have an Account? <Link to="/register">Register Now!</Link></p>
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    );
}
