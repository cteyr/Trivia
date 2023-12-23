import { useState,useEffect } from "react";
import { Question } from "../types/question";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const QuestionsContainer = () => {
    const [currentUser, setCurrentUser]= useState("");
    const [questions, setQuestions] = useState <Question[]>([]);
    const [countQusetion, setCountQusetion]= useState(0);

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => { //Capturar la opcion seleccionada y actualizar la variable de estado
      setSelectedOption(event.target.value);
    };

    useEffect(() => {
        console.log("La pregunta seleccionada es ",selectedOption);
    }, [selectedOption]);



    useEffect(() => { //Colocar nombre de Usuario
        let userName = localStorage.getItem('userName');
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        setCurrentUser(userName);
    }, []);

    useEffect(() => { // Llamada a la API que me traera el Array de preguntas
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
                        <form>
                            <label className="labelOption">
                              <Input type="radio" value="option1" checked={selectedOption === 'option1'} handleInputChange={handleOptionChange}/>
                              {questions[countQusetion].correct_answer}
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value="option2" checked={selectedOption === 'option2'} handleInputChange={handleOptionChange}/>
                              {questions[countQusetion].incorrect_answers[0]}
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value="option3" checked={selectedOption === 'option3'} handleInputChange={handleOptionChange}/>
                              {questions[countQusetion].incorrect_answers[1]}
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value="option4" checked={selectedOption === 'option4'} handleInputChange={handleOptionChange}/>
                              {questions[countQusetion].incorrect_answers[2]}
                            </label>
                        </form>
                    </div>
                ):(
                    <div className="booleanContainer">
                        <p>Booleano</p>
                    </div>
                )}
                </div>
            )}
                <Button clasname="confirmButton" text="Confirm"/>
        </div>
    );
}

export {QuestionsContainer}