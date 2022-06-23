import React from "react";
import s from './CartCard.module.css';

export default function CartCard({product, deleteItem, index}){

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
                <img className={s.img} src={product.imagen} alt='item img'/>
            </div>
            <div className={s.data}>
                <div className={s.top}>
                    <div className={s.titleContainer}>
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