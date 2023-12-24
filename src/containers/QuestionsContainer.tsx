import { useState,useEffect } from "react";
import { Question } from "../types/question";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { NavLink } from "react-router-dom";

const QuestionsContainer = () => {
    const [currentUser, setCurrentUser]= useState("");
    const [questions, setQuestions] = useState <Question[]>([]);
    const [countQusetion, setCountQusetion]= useState(0);
    const [randomQuestion , setRandomQuestion] = useState([]);
    const [loading , setLoading] = useState<boolean>();
    const [selectedOption, setSelectedOption] = useState('');
    const [checkResponse, setcheckResponse] = useState('');
    const [score, setCountScore]= useState(0);
    const [timer, setTimer]= useState(15);

    const handleOptionChange = (event) => { //Capturar la opcion seleccionada y actualizar la variable de estado
      setSelectedOption(event.target.value);
    };

    const checkAnswer = () => { // Funcion para checkear respuestas
        if(selectedOption && selectedOption != "") {

            document.querySelector('.textResultResponse').classList.remove('dontshow');

            if(selectedOption == questions[countQusetion].correct_answer){
                console.log("Respuesta Correcta");
                if(questions[countQusetion].difficulty == "easy"){
                    setCountScore(score+1); //Dificultad facil suma 1 punto al Score
                }else if(questions[countQusetion].difficulty == "medium"){
                    setCountScore(score+2); //Dificultad media suma 2 punto al Score
                }else if (questions[countQusetion].difficulty == "hard"){
                    setCountScore(score+3); //Dificultad dificil suma 3 punto al Score
                }

                setcheckResponse("Correct answer")
            }else {

                setcheckResponse("Wrong answer")
                console.log("Respuesta Incorrecta");
            }

            if(countQusetion < 9){ // Si el contador no ha llegado a la pregunta numero 10
                setCountQusetion(countQusetion + 1);
                setTimer(15); //Inicializamos el contador en 15 segundos
            }else {
                document.querySelector('.bodyQuestions').classList.add('dontshow');
                document.querySelector('.resultContainer').classList.remove('dontshow');
                setTimer(0);
                document.querySelector('.timerLabel').classList.add('dontshow');
                document.querySelector('.textResultResponse').classList.add('dontshow');
            }
            
            setSelectedOption('');

            setTimeout(() => {
                document.querySelector('.textResultResponse').classList.add('dontshow');
            }, 1000);
        }
    }

    useEffect(() => { //Temporizador cuenta regresiva
        if(loading){
            document.querySelector('.timerLabel').classList.remove('dontshow');
            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(interval);
                        //timerElement.textContent = '¡Tiempo terminado!';
                        if(countQusetion < 9){
                            setCountQusetion(countQusetion + 1); // Avanzamos a la siguiente pregunta
                            setTimer(15); //Inicializamos el contador en 15 segundos
                        }else{
                            document.querySelector('.bodyQuestions').classList.add('dontshow');
                            document.querySelector('.resultContainer').classList.remove('dontshow');
                            setTimer(0);
                            document.querySelector('.timerLabel').classList.add('dontshow');
                            document.querySelector('.textResultResponse').classList.add('dontshow');
                        }
                        return 0;
                    }
                });
            }, 1000);
    
            return () => clearInterval(interval);
        }
    }, [countQusetion, loading]);

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
                if(data.response_code == 0) { // Respondio correctamente
                    setQuestions(data.results);
                    setLoading(true); 
                }else if(data.response_code == 5){ // Respondio (Too Many Requests)
                    console.log("Respuesta del servidor (Demasiadas solicitudes)");
                    document.querySelector('.messageErrorApi').classList.remove('dontshow');
                    setLoading(false);
                    setCountQusetion(-1); 
                }else {
                    console.log("Codigo de error desconocido");
                    setLoading(false); 
                }
                
            })
            .catch(error => {
                console.log('Error ',error);
            });
    
        return () => {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        if(loading){
            let randomizedAnswers = []; //Array de preguntas
            let correct_question = false; //Control para saber cuando ya eh puesto la pregunta correcta
            let incorrect_question = 0; //Contador de preguntas incorrecta

            if(questions[countQusetion].type == 'multiple'){
                for (let i = 0; i < 4; i++) {
                    if(Math.round(Math.random()) == 0 && correct_question==false){
                        randomizedAnswers.push(questions[countQusetion].correct_answer);
                        correct_question = true;
                    }else if(incorrect_question > 2){
                        randomizedAnswers.push(questions[countQusetion].correct_answer);
                        correct_question = true;
                    }else {
                        randomizedAnswers.push( questions[countQusetion].incorrect_answers[incorrect_question]);
                        incorrect_question = incorrect_question +1;
                    }
                }
            }else{
                randomizedAnswers.push("True");
                randomizedAnswers.push("False");
            }
            
            setRandomQuestion(randomizedAnswers);
        }
        
    }, [countQusetion, loading]);

    return (
        <div className="questionContainer">
            <div className="topContainer">
                <p className="userNameLabel">User: {currentUser}</p>
                <p className="scoreLabel dontshow">Score: {score}</p>
                <p className="countQuestionLabel">Questions: {countQusetion+1}/10</p>
            </div>
                <p id="timer" className="timerLabel dontshow">Time left: {timer} seconds</p>
            <p className="messageErrorApi dontshow">Server response: Too many requests. Try again after a few seconds.</p>
            {questions && questions.length > 0 && (
                <div className="bodyQuestions">
                <p className="questionText">{questions[countQusetion].question}</p>
                {questions[countQusetion] && questions[countQusetion].type == 'multiple' ? (
                    <div className="multipleContainer">
                        <form>
                            <label className="labelOption">
                              <Input type="radio" value={randomQuestion[0]} checked={selectedOption === randomQuestion[0]} handleInputChange={handleOptionChange}/>
                              <span>{randomQuestion[0]}</span>
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value={randomQuestion[1]} checked={selectedOption === randomQuestion[1]} handleInputChange={handleOptionChange}/>
                              <span>{randomQuestion[1]}</span> 
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value={randomQuestion[2]} checked={selectedOption === randomQuestion[2]} handleInputChange={handleOptionChange}/>
                              <span>{randomQuestion[2]}</span> 
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value={randomQuestion[3]} checked={selectedOption === randomQuestion[3]} handleInputChange={handleOptionChange}/>
                              <span>{randomQuestion[3]}</span> 
                            </label>
                        </form>
                    </div>
                ):(
                    <div className="booleanContainer">
                        <form>
                            <label className="labelOption">
                              <Input type="radio" value={randomQuestion[0]} checked={selectedOption === randomQuestion[0]} handleInputChange={handleOptionChange}/>
                              <span>{randomQuestion[0]}</span> 
                            </label>

                            <label className="labelOption">
                              <Input type="radio" value={randomQuestion[1]} checked={selectedOption === randomQuestion[1]} handleInputChange={handleOptionChange}/>
                              <span>{randomQuestion[1]}</span> 
                            </label>

                        </form>
                        
                    </div>
                )}
                </div>
            )}

            <div className="resultContainer dontshow">
                <p className="labelFinishTrivia">Congratulations: {currentUser}</p>
                <p className="labelFinishTriviaScore">Your final score is: {score} points</p>
            </div>
            <p className="textResultResponse dontshow">{checkResponse}</p>
            <div className="containerButtons">
                <Button clasname="confirmButton" text="Confirm" onClick={checkAnswer}/>
                <NavLink to="/" >
                    <Button clasname="backButton" text="Back"/>
                </NavLink>
            </div>
            
                
        </div>
    );
}

export {QuestionsContainer}