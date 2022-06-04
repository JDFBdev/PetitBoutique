import React, { useState } from "react";
import s from './Card.module.css';
import itemIMG from '../../img/itemIMG.png';

export default function Card(){
    const [selected, setSelected] = useState('0');

    const handleColors = function(e){
        setSelected(e.target.id);
    }

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
                <img className={s.img} src={itemIMG} alt='item img'/>
            </div>
            <div className={s.content}>
                <div className={s.data}>
                    <h4 className={s.title}>Pantalones Unicornios</h4>
                    <div className={s.priceContainer}>
                        <p className={s.price}>$2350</p>
                        <div className={s.talle}>
                            Talle 12
                        </div>
                    </div>
                    <div className={s.colors}>
                        <div id='0' className={s.color} style={{backgroundColor: '#EFB693', transform: (selected === '0') && 'scale(1.4)'}} onClick={handleColors}/>
                        <div id='1' className={s.color} style={{backgroundColor: '#433F56', transform: (selected === '1') && 'scale(1.4)'}} onClick={handleColors}/>
                        <div id='2' className={s.color} style={{backgroundColor: '#EFD8EE', transform: (selected === '2') && 'scale(1.4)'}} onClick={handleColors}/>
                        <div id='3' className={s.color} style={{backgroundColor: '#0098DA', transform: (selected === '3') && 'scale(1.4)'}} onClick={handleColors}/>
                    </div>
                </div>
                <button className={s.btnCart}>Agregar al carrito</button>
            </div>
        </div>
    )
}