
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        Cookies.set("name", name);
        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name:</label>
            <input type="text" id="name" value={name} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}
