import React, { useState } from "react";
import s from './Card.module.css';

export default function Card({product, disableCart}){
    const [selected, setSelected] = useState(0);

    const handleColors = function(e){
        setSelected(Number(e.target.id));
    }

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
            {
                product ?
                <img className={s.img} src={product.imagen[selected]} alt='Sin imagen'/> :
                null
            }
            </div>
            <div className={s.content}>
                <div className={s.data}>
                    <div className={s.titleContainer}>
                    {
                        product ? 
                        <h4 className={s.title}>{product.nombre}</h4>:
                        <h4 className={s.title}> </h4>
                    }
                    </div>  
                    <div className={s.priceContainer}>
                    {
                        product ?
                        <p className={s.price}>${product.precio}</p>:
                        <p className={s.price}>$0</p>
                    }
                    <select className={s.talle}>
                        <option value='default' >Talle&nbsp;&nbsp;&nbsp;</option>
                        {
                            product &&
                            product.talle.map((o)=>{
                                return <option value={o} key={o} >Talle {o}</option>
                            })
                        }
                    </select>
                    </div>
                    {/* If colors > 4, justify-content: space-between, gap: .5rem */}
                    <div className={s.colors} style={product && {justifyContent: product.color.length > 4 && 'space-between', gap: product.color.length > 4 && '.5rem' }}>
                    {
                        product && product.color[0] ?
                        product.color.map((c,i)=>{
                            return  <div key={i} id={i} className={s.color} style={{backgroundColor: c, transform: (selected === Number(i)) && 'scale(1.4)'}} onClick={handleColors}/>
                        }): 
                        <div id={0} className={s.color} style={{backgroundColor: '#ffffff', transform: (selected === 0) && 'scale(1.4)'}} onClick={handleColors}/>
                    }
                    </div>
                </div>
                <button className={s.btnCart}>Agregar al carrito</button>
            </div>
        </div>
    )
}