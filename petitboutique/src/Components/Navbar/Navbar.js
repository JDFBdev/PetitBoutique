import React from 'react';
import s from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Petit Boutique.png';
import Cart from '../../img/cart.png';
import Wpp from '../../img/wpp.png';
import Insta from '../../img/instagram.png';
import Lupa from '../../img/lupa.png';

export default function Navbar() {

  const Navigate = useNavigate();

  return (
    <div className={s.container}>
        <img className={s.petitLogo} src={Logo} alt='Petit Boutique Logo' onClick={()=> Navigate('/')}/>
        <div className={s.search}>
            <form className={s.form}>
                <input className={s.input} placeholder='Encontra lo que buscas...'/>
                <img className={s.lupa} src={Lupa} alt='Lupa' onClick={()=> Navigate('/Search')}/>
            </form>
            <div className={s.categories}>
                <button className={s.category} onClick={()=> Navigate('/Search')}>Buzos</button>
                <button className={s.category} onClick={()=> Navigate('/Search')}>Remeras</button>
                <button className={s.category} onClick={()=> Navigate('/Search')}>Leggins</button>
                <button className={s.category} onClick={()=> Navigate('/Search')}>Vestidos</button>
                <button className={s.category} onClick={()=> Navigate('/Search')}>Gorritos</button>
                <button className={s.category} onClick={()=> Navigate('/Search')}>Zapatilas</button>
            </div>
        </div>
        <div className={s.logos}>
            <div className={s.logoContainer}>
                <img className={s.logo} src={Insta} alt='Instagram Logo' onClick={() => {window.open('https://www.instagram.com/petit_boutiqueok/','_blank')}}/>
            </div> 
            <div className={s.logoContainer}>
                <img className={s.logo} src={Wpp} alt='Whatsapp Logo' onClick={() => {window.open('https://api.whatsapp.com/send?phone=+5491165045230&text=message&app_absent=0','_blank')}}/>
            </div>
            <div className={s.logoContainer}>
                <img className={s.logo} src={Cart} alt='Cart Logo'/>
            </div>
        </div>
    </div>
  );
}