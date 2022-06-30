import React from "react";
import s from './CartCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function CartCard({product, deleteItem, index}){
    const Navigate = useNavigate();

    return(
        <div className={s.container}>
            <div className={s.imgContainer} onClick={()=>{Navigate(`/Product/${product.id}`); window.location.reload();}}>
                <img className={s.img} src={product.imagen[product.color]} alt='item img'/>
            </div>
            <div className={s.data}>
                <div className={s.top}>
                    <div className={s.titleContainer} onClick={()=>{Navigate(`/Product/${product.id}`); window.location.reload();}}>
                        <p className={s.title}>{product.nombre}</p>
                    </div>
                    <button className={s.btnDelete} onClick={()=>{deleteItem(index)}}>X</button>
                </div>
                <div className={s.details}>
                    <p className={s.p}>${product.precio}</p>
                    <div className={s.color} style={{backgroundColor: product.colorCode}}/>
                    <div className={s.talle}>Talle {product.talle}</div>
                </div>
            </div>
        </div>
    )
}