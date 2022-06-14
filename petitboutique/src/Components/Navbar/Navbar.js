import React, { useState } from 'react';
import s from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Petit Boutique.png';
import Cart from '../../img/cart.png';
import Wpp from '../../img/wpp.png';
import Insta from '../../img/instagram.png';
import { isMobile } from 'react-device-detect';
import Lupa from '../../img/lupa.png';

export default function Navbar() {
    const [input, setInput] = useState('');
    const Navigate = useNavigate();

    const handleInput = function(e){
        setInput(e.target.value)
    }

    const handleWasap = function(e){
        e.preventDefault();
        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491136744995&text=Buen día!&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491136744995&text=Buen día!`,'_blank');
    }

  return (
    <div className={s.container}>
        <img className={s.petitLogo} src={Logo} alt='Petit Boutique Logo' onClick={()=> Navigate('/')}/>
        <div className={s.content}>
            <div className={s.search}>
                <form className={s.form}>
                    <input className={s.input} onChange={handleInput} placeholder='Encontra lo que buscas...'/>
                    <img className={s.lupa} src={Lupa} alt='Lupa' onClick={()=> Navigate('/Search/Populares')}/>
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
                <div className={s.logoContainer}  onClick={() => {window.open('https://www.instagram.com/petit_boutiqueok/','_blank')}}>
                    <img className={s.logo} src={Insta} alt='Instagram Logo'/>
                </div> 
                <div className={s.logoContainer} onClick={handleWasap}>
                    <img className={s.logo} src={Wpp} alt='Whatsapp Logo' />
                </div>
                <div className={s.logoContainer}>
                    <img className={s.logo} src={Cart} alt='Cart Logo'/>
                </div>
            </div>
        </div>
    </div>
  );
}