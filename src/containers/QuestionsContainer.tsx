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

                setcheckResponse("Respuesta Correcta")
            }else {

                setcheckResponse("Respuesta Incorrecta")
                console.log("Respuesta Incorrecta");
            }

            if(countQusetion < 9){ // Si el contador no ha llegado a la pregunta numero 10
                setCountQusetion(countQusetion + 1);
            }
            
            setSelectedOption('');

            setTimeout(() => {
                document.querySelector('.textResultResponse').classList.add('dontshow');
            }, 1000);
        }
    }

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
                    setLoading(false); 
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
                <p className="scoreLabel">Score: {score}</p>
                <p className="countQuestionLabel">Questions: {countQusetion+1}/10</p>
            </div>
         
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
                <p className="textResultResponse dontshow">{checkResponse}</p>
                <Button clasname="confirmButton" text="Confirm" onClick={checkAnswer}/>
                <NavLink to="/" >
                    <Button clasname="backButton" text="Back"/>
                </NavLink>
                
        </div>
    );
}

export {QuestionsContainer}