import React, { useState } from 'react';
import s from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Petit Boutique.png';
import Cart from '../../img/cart.png';
import Wpp from '../../img/wpp.png';
import Insta from '../../img/instagram.png';
import { isMobile } from 'react-device-detect';
import Lupa from '../../img/lupa.png';
import axios from 'axios';
import NavbarCard from './NavbarCard/NavbarCard';

export default function Navbar({open, cartLength}) {
    const [input, setInput] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const handleInput = async function(e){
        setInput(e.target.value);
        if(input.length >= 3){
            setLoading(true);
            let promise = await axios.get(`https://petit-boutique-backend.onrender.com/buscadorNavbar/${input}`)
            let response = promise.data;
            setProducts(response);
            setLoading(false);
        } else {
            setProducts([]);
        } 
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
                <form className={s.form} onSubmit={()=> {if(input !== '' && input > 2){Navigate(`/Search/${input}`)}}}>
                    <input className={s.input} onChange={handleInput} placeholder='Encontra lo que buscas...'/>
                    <img className={s.lupa} src={Lupa} alt='Lupa' onClick={()=> {if(input !== '' && input > 2){Navigate(`/Search/${input}`)}}}/>
                </form>
                {
                    input.length > 3 && 
                    <div className={s.browser} >
                        <div className={s.browserMargin}/>
                        {
                            !loading ? 
                            products[0]  ? 
                            products?.map((p)=>{
                                return <NavbarCard product={p} key={p.id}/>
                            }) : 
                            <NavbarCard product={{ nombre: 'No se encontraron resultados', imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zwQAAgYBAyKDV6YAAAAASUVORK5CYII='}} />:
                            <NavbarCard product={{ nombre: 'Buscando...', imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zwQAAgYBAyKDV6YAAAAASUVORK5CYII='}} />
                        }
                    </div>
                }

                <div className={s.categories}>
                    <button className={s.category} onClick={()=> Navigate('/Search/Remeras')}>Remeras</button>
                    <button className={s.category} onClick={()=> Navigate('/Search/Pantalones')}>Pantalones</button>
                    <button className={s.category} onClick={()=> Navigate('/Search/Vestidos')}>Vestidos</button>
                    <button className={s.category} onClick={()=> Navigate('/Search/Accesorios')}>Accesorios</button>
                    <button className={s.category} onClick={()=> Navigate('/Search/Abrigos')}>Abrigos</button>
                    <button className={s.category} onClick={()=> Navigate('/Search/Bebes')}>Bebes</button>
                </div>
            </div>
            <div className={s.logos}>
                <div className={s.logoContainer}  onClick={() => {window.open('https://www.instagram.com/petit_boutiqueok/','_blank')}}>
                    <img className={s.logo} src={Insta} alt='Instagram Logo'/>
                </div> 
                <div className={s.logoContainer} onClick={handleWasap}>
                    <img className={s.logo} src={Wpp} alt='Whatsapp Logo' />
                </div>
                <div className={s.logoContainer} onClick={open}>
                    {
                        cartLength > 0 && <div className={s.cartLength}>{cartLength}</div>
                    }
                    <img className={s.logo} src={Cart} alt='Cart Logo'/>
                </div>
            </div>
        </div>
    </div>
  );
}