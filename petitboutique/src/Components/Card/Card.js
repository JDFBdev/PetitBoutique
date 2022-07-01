import React, { useEffect, useState } from "react";
import s from './Card.module.css';
import toast from 'react-hot-toast';
import ColorName from '../ColorName/ColorName';
import { useNavigate } from 'react-router-dom';

export default function Card({product, disableCart, setCartLength}){
    const [options, setOptions] = useState({color: 0, talle: 'X'})
    const [imagenes, setImagenes] = useState([]);
    const Navigate = useNavigate();

    useEffect(()=>{

        // let images = [];
        // product.imagen.forEach(async p =>{
        //     const response = await fetch(p)
        //     const blob = await response.blob()
          
        //     const url = URL.createObjectURL(blob.slice(0, 4000))
          
        //     const image = new Image()
        //     image.src = url
        //     images.push(image);
        // })
        // setImagenes(images);

        //TODO Habilitar CORS en firebase storage

    },[]);

    const handleColors = function(e){
        setOptions(prev=>({...prev, color: Number(e.target.id)}));
    }

    const handleTalles = function(e){
        setOptions(prev=>({...prev, talle: e.target.value}));
    }

    const handleCarrito = function(){

        if (!disableCart){
            let productsCart = [];

            if (localStorage.getItem('order')) {            // Si hay algo en el localStorage

                productsCart = localStorage.getItem('order');  // Lo traigo
                productsCart = JSON.parse(productsCart);       // Y lo convierto a JSON
                productsCart.push({...product, colorName: ColorName(product.color[options.color]), colorCode: product.color[options.color], color: options.color, talle: options.talle});  //  Lo pusheo
                localStorage.setItem('order', JSON.stringify(productsCart))   // Y subo al localStorage
                setCartLength(productsCart.length);
            } else {                                           // Si no hay nada en el localStorage
                productsCart.push({...product, colorName: ColorName(product.color[options.color]), colorCode: product.color[options.color], color: options.color, talle: options.talle});    //  Lo pusheo
                localStorage.setItem('order', JSON.stringify(productsCart))   // Y subo al localStorage
                setCartLength(productsCart.length);
            }
            toast.success('Producto Agregado al carrito');
        }
    }

    return(
        <div className={s.container}>
            <div className={s.imgContainer}>
            {
                product ?
                <img className={s.img} src={product.imagen[options.color]} alt='Sin imagen' onClick={()=>Navigate(`/Product/${product.id}`)}/> :
                null
            }
            </div>
            <div className={s.content}>
                <div className={s.data}>
                    <div className={s.titleContainer}>
                    {
                        product ? 
                        <h4 className={s.title} onClick={()=>Navigate(`/Product/${product.id}`)}>{product.nombre}</h4>:
                        <h4 className={s.title}> </h4>
                    }
                    </div>  
                    <div className={s.priceContainer}>
                    {
                        product ?
                        <p className={s.price}>${product.precio}</p>:
                        <p className={s.price}>$0</p>
                    }
                    <select className={s.talle} onChange={handleTalles}>
                        <option value='X' >Talle&nbsp;&nbsp;&nbsp;</option>
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
                            return  <div key={i} id={i} className={s.color} style={{backgroundColor: c, transform: (options.color === Number(i)) && 'scale(1.4)'}} onClick={handleColors}/>
                        }): 
                        <div id={0} className={s.color} style={{backgroundColor: '#ffffff', transform: (options.color === 0) && 'scale(1.4)'}} onClick={handleColors}/>
                    }
                    </div>
                </div>
                <button className={s.btnCart} onClick={handleCarrito}>Agregar al carrito</button>
            </div>
        </div>
    )
}