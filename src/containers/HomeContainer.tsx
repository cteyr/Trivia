import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { NavLink } from "react-router-dom";
//@ts-ignore
import triviaLogo from "../assets/images/triviaLogo.png";
import { useState,useEffect } from "react";


const HomeContainer = () =>{
    const [nameUser, setNameUser]= useState("");
    const [stateButton, setStateButton]= useState(true); 

    useEffect(() => {
       if(nameUser != ""){ //Compruebo si el campo "Username" es distinto de vacio
        setStateButton(false); //Habilito el boton de login
       }
    }, [nameUser]);
    
    return (
        <div className="homeContainer">
            <img className="logoHome" src={triviaLogo} alt="logoTrivia"/>
                <div className="mainContainerForm">
                    <div className="inputHomeContainer">
                        <p className="welcomeHome">Bienvenidos</p>
                        <p className="labelHome">Introduzca su nombre</p>
                        <Input value={nameUser} 
                        clasname="inputNameUser" 
                        handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameUser(e.target.value)}
                        placeholder="Username"
                        />
                    </div>
                    <div className="buttonnHomeContainer">
                    <NavLink to="/questions" >
                        <Button clasname="startButton" text="Comenzar" disabled={stateButton}/>
                    </NavLink>
                    </div>
                </div>
        </div>
    );
}

export {HomeContainer}