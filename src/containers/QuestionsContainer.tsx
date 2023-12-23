import { useState,useEffect } from "react";
import { Question } from "../types/question";

const QuestionsContainer = () => {
    const [currentUser, setCurrentUser]= useState("");
    const [questions, setQuestions] = useState <Question[]>([]);
    const [countQusetion, setCountQusetion]= useState(0);

    useEffect(() => {
        let userName = localStorage.getItem('userName');
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        setCurrentUser(userName);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        fetch(`https://opentdb.com/api.php?amount=10`, { signal })
            .then(response => response.json())
            .then(data => {
                setQuestions(data.results);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('La solicitud fue cancelada');
                } else {
                    console.error('Error:', error);
                }
            });
    
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <div className="questionContainer">
            <div className="topContainer">
                <p className="userNameLabel">Usuario: {currentUser}</p>
                <p className="countQuestionLabel">Preguntas: {countQusetion+1}/10</p>
            </div>
         
            {questions && questions.length > 0 && (
                <div className="bodyQuestions">
                <p className="questionText">{questions[countQusetion].question}</p>
                {questions[countQusetion].type == 'multiple' ? (
                    <div className="multipleContainer">

                    </div>
                ):(
                    <div className="booleanContainer"></div>
                )}
                </div>
            )}
                
        </div>
    );
}

export {QuestionsContainer}