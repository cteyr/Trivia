import { useState,useEffect } from "react";

const QuestionsContainer = () => {
    const [currentUser, setCurrentUser]= useState("");

    useEffect(() => {
        let userName = localStorage.getItem('userName');
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        setCurrentUser(userName);
    }, []);

    return (
        <div className="questionContainer">
            <p className="userNameLabel">Usuario: {currentUser}</p>
        </div>
    );
}

export {QuestionsContainer}