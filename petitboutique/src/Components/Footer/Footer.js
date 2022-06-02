import React from "react";
import s from './Footer.module.css';
import instagram from '../../img/instagram.png';
import wpp from '../../img/wpp.png';
import facebook from '../../img/facebook.png';
import petit from '../../img/Petit Boutique.png'

export default function Footer({color}){

    return (
        <div className={s.container}>
            <img className={s.petit} src={petit} alt='Petit Boutique Logo'/>
            <p className={s.p}> 
                Lunes a Viernes 10 - 19hs<br/>
                Sabados 10:30 - 14:30hs
            </p>
            <div className={s.logos}>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={instagram} alt='Instagram Logo'/>
                </div> 
                <div className={s.logoContainer}>
                    <img className={s.logo} src={wpp} alt='Whatsapp Logo'/>
                </div>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={facebook} alt='Facebook Logo'/>
                </div>
            </div>
            <p className={s.p}>petitboutiqueok@gmail.com</p>
        </div>
    )
}