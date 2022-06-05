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
                    <img className={s.logo} src={instagram} alt='Instagram Logo' onClick={() => {window.open('https://www.instagram.com/petit_boutiqueok/','_blank')}}/>
                </div> 
                <div className={s.logoContainer}>
                    <img className={s.logo} src={wpp} alt='Whatsapp Logo' onClick={() => {window.open('https://api.whatsapp.com/send?phone=+5491165045230&text=message&app_absent=0','_blank')}}/>
                </div>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={facebook} alt='Facebook Logo' onClick={() => {window.open('https://www.facebook.com/profile.php?id=100046609406051','_blank')}}/>
                </div>
            </div>
            <p className={s.p}>petitboutiqueok@gmail.com</p>
        </div>
    )
}