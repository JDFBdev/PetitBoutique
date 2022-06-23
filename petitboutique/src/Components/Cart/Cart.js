import React, { useState, useEffect } from "react";
import s from './Cart.module.css';
import Wpp from '../../img/wppwhite.png';
import CartCard from "./CartCard/CartCard";
import {isMobile} from 'react-device-detect';

export default function Cart(){
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        let productsCart = [];

        if (localStorage.getItem('order')) {
          productsCart = localStorage.getItem('order');
          productsCart = JSON.parse(productsCart);
          setProducts(productsCart);
          handleTotal(productsCart);
        }

    },[])

    const handleTotal = function(products){
        let aux = 0;
        products.forEach(p=>{
            aux = aux + Number(p.precio)
        })
        setTotal(aux);
    }

    const deleteItem = function(i){
        let productsCart = [];
        productsCart = localStorage.getItem('order');
        productsCart = JSON.parse(productsCart);
        productsCart = productsCart.filter((product, index) => i !== index);
        setProducts(productsCart);
        handleTotal(productsCart);
        localStorage.setItem('order', JSON.stringify(productsCart))
    }

    const handleWasap = function(e){
        e.preventDefault();

        isMobile ?
        window.open(`https://api.whatsapp.com/send?phone=+5491136744995&text=Buen día! Quisiera hacerles el siguiente pedido:%0a${
            products.map((p)=>{
                return `• ${p.nombre}, color ${p.colorName}, talle ${p.talle}. $${p.precio}.%0a`
        }).join('')}%0aTotal: $${total}&app_absent=0`,'_blank') : 
        window.open(`https://web.whatsapp.com/send?phone=+5491136744995&text=Buen día! Quisiera hacerles el siguiente pedido:%0a${
            products.map((p)=>{
                return `• ${p.nombre}, color ${p.colorName}, talle ${p.talle}. $${p.precio}.%0a`
        }).join('')}%0aTotal: $${total}&app_absent=0`,'_blank');
    }

    return(
        <div className={s.container}>
            <div className={s.header}>
                <h3 className={s.title}>Carrito</h3>
                {
                    products.length === 0 && <p className={s.subTitle}>No hay productos</p>
                }
                {
                    products.length === 1 && <p className={s.subTitle}>1 Producto</p>
                }
                {
                    products.length > 1 && <p className={s.subTitle}>{products.length} Productos</p>
                }
            </div>
            <div className={s.cards}>
                {
                    products?.map((p,i)=>{
                        return <CartCard key={i} index={i} product={p} deleteItem={deleteItem}/>
                    })
                }
            </div>
            <p className={s.subTitle}>Total: ${total}</p>
            {
                products.length === 0 ? 
                    <div className={s.btnSubmitError}>
                    <p className={s.btnText}>Continuar Pedido</p>
                    <img src={Wpp} alt='wpp logo' className={s.wppLogo}></img>
                </div>:
                    <div className={s.btnSubmit} onClick={handleWasap}>
                    <p className={s.btnText}>Continuar Pedido</p>
                    <img src={Wpp} alt='wpp logo' className={s.wppLogo}></img>
                </div>
            }

        </div>
    )
}