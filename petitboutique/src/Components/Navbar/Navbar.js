import React from 'react';
import s from './Navbar.module.css';
import Logo from '../../img/Petit Boutique.png';
import Cart from '../../img/cart.png';
import Wpp from '../../img/wpp.png';
import Insta from '../../img/instagram.png';
import Lupa from '../../img/lupa.png';

export default function Navbar() {
  return (
    <div className={s.container}>
        <img className={s.petitLogo} src={Logo} alt='Petit Boutique Logo'/>
        <div className={s.search}>
            <form className={s.form}>
                <input className={s.input} placeholder='Encontra lo que buscas...'/>
                <img className={s.lupa} src={Lupa} alt='Lupa'/>
            </form>
            <div className={s.categories}>
                <button className={s.category}>Buzos</button>
                <button className={s.category}>Remeras</button>
                <button className={s.category}>Leggins</button>
                <button className={s.category}>Vestidos</button>
                <button className={s.category}>Gorritos</button>
                <button className={s.category}>Zapatilas</button>
            </div>
        </div>
        <div className={s.logos}>
            <div className={s.logoContainer}>
                <img className={s.logo} src={Insta} alt='Instagram Logo'/>
            </div> 
            <div className={s.logoContainer}>
                <img className={s.logo} src={Wpp} alt='Whatsapp Logo'/>
            </div>
            <div className={s.logoContainer}>
                <img className={s.logo} src={Cart} alt='Cart Logo'/>
            </div>
        </div>
    </div>
  );
}