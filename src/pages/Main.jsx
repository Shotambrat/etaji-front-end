import React, { useState } from "react";
import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate("/home");
    };

    return (
        <div>
            <Login onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}
