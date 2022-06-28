import React from "react";
import s from './NavbarCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function NavbarCard({product}){
    const Navigate = useNavigate();
    const url = window.location.href;

    return (
        <div className={s.container} onClick={()=>{if(product.id) {Navigate(`/Product/${product.id}`); if(url.includes('Product')) window.location.reload();}}}>
            <img className={s.image} src={product.imagen} alt='Product'/>
            <div className={s.titleContainer}>
                <p className={s.title}>{product.nombre}</p>
            </div>
        </div>
    )
}