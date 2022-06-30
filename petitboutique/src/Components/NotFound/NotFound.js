import React, {useState, useEffect} from "react";
import s from './NotFound.module.css';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useModal } from "react-hooks-use-modal";
import Cart from "../Cart/Cart";
import Transition from "../Transition/Transition";

export default function NotFound(){
    const [cartLength, setCartLength] = useState(0);
    const [Modal, open, close] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    const Navigate = useNavigate();

    useEffect(()=>{  // Obtengo data de productos
        if (localStorage.getItem('order')) {
            let productsCart = [];
            productsCart = localStorage.getItem('order');
            productsCart = JSON.parse(productsCart);
            setCartLength(productsCart.length);
        }
    },[]);

    return(
        <div className={s.container}>
            <Navbar open={open} cartLength={cartLength}/>
            <div className={s.content}>
                <h1 className={s.title}>El contenido que estas buscando<br/>no esta disponible.</h1>
                <button className={s.btn} onClick={()=>{Navigate('/')}}>Volver al inicio</button>
            </div>
            <Footer/>
            <Modal>
                <Transition>
                    <Cart close={close} setCartLength={setCartLength}/>
                </Transition>
            </Modal>
        </div>
    )
}