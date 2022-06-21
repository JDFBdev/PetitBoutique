import React from "react";
import s from './AdminCard.module.css';

export default function AdminCard({open, product, setSelected, setSelectedImagePreview}){

    return(
        <div className={s.container} onClick={()=>{open(); setSelected(product); setSelectedImagePreview([]);}}>
            <img className={s.img} src={product.imagen[0]} alt='item img'/>
            <div className={s.titleContainer}>
                <p className={s.title}>{product.nombre}</p>
            </div>
        </div>
    )
}