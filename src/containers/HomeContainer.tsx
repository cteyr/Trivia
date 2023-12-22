import { Button } from "../components/Button";
import { Input } from "../components/Input";
//@ts-ignore
import triviaLogo from "../assets/images/triviaLogo.png";


const HomeContainer = () =>{
    
    return (
        <div className="homeContainer">
            <img className="logoHome" src={triviaLogo} alt="logoTrivia"/>
                <div className="mainContainerForm">
                    <div className="inputHomeContainer">
                        <p className="labelHome">Introduzca su nombre</p>
                        <Input clasname="inputNameUser"/>
                    </div>
                    <div className="buttonnHomeContainer">
                        <Button clasname="startButton" text="Comenzar"/>
                    </div>
                </div>
        </div>
    );
}

export {HomeContainer}