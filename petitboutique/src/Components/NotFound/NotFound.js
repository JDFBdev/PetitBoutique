import React from "react";
import s from './NotFound.module.css';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function NotFound(){
    const Navigate = useNavigate();

    return(
        <div className={s.container}>
            <Navbar/>
            <div className={s.content}>
                <h1 className={s.title}>El contenido que estas buscando<br/>no esta disponible.</h1>
                <button className={s.btn} onClick={()=>{Navigate('/')}}>Volver al inicio</button>
            </div>
            <Footer/>
        </div>
    )
}