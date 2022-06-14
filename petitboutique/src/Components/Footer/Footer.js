import React from "react";
import s from './Footer.module.css';
import instagram from '../../img/instagram.png';
import wpp from '../../img/wpp.png';
import facebook from '../../img/facebook.png';
import petit from '../../img/Petit Boutique.png'
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

export default function Footer(){
    const Navigate = useNavigate();

    const handleWasap = function(e){
        e.preventDefault();
        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491136744995&text=Buen día!&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491136744995&text=Buen día!`,'_blank');
    }

    return (
        <div className={s.container}>
            <img className={s.petit} src={petit} alt='Petit Boutique Logo'  onClick={() => Navigate('/')}/>
            <p className={s.p}> 
                Lunes a Viernes 10 - 19hs<br/>
                Sabados 10:30 - 14:30hs
            </p>
            <div className={s.logos}>
                <div className={s.logoContainer} onClick={() => {window.open('https://www.instagram.com/petit_boutiqueok/','_blank')}}>
                    <img className={s.logo} src={instagram} alt='Instagram Logo' />
                </div> 
                <div className={s.logoContainer} onClick={handleWasap}>
                    <img className={s.logo} src={wpp} alt='Whatsapp Logo'/>
                </div>
                <div className={s.logoContainer} onClick={() => {window.open('https://www.facebook.com/profile.php?id=100046609406051','_blank')}}>
                    <img className={s.logo} src={facebook} alt='Facebook Logo' />
                </div>
            </div>
            <p className={s.p}>petitboutiqueok@gmail.com</p>
        </div>
    )
}