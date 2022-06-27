import React, {useEffect, useState} from "react";
import s from './ProductPage.module.css';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useModal } from 'react-hooks-use-modal';
import Cart from "../Cart/Cart";
import Transition from "../Transition/Transition";
import Footer from "../Footer/Footer";
import loading from '../../img/loading.gif';

export default function ProductPage(){
    const [product, setProduct] = useState({nombre: '', categoria: [], talle: [], imagen: [loading], color: [], precio: ''});
    const [options, setOptions] = useState({color: 0, talle: 'X'})
    const [cartLength, setCartLength] = useState(0);
    const [Modal, open, close] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    let { param } = useParams();

    useEffect(()=>{  // Obtengo data de productos
        window.scrollTo(0, 0);
        async function fetchData() {
            let promise = await axios.get(`https://petitboutique-backend.herokuapp.com/buscarProducto/${param}`)
            let response = promise.data;
            setProduct(response);
        }
        fetchData();

        if (localStorage.getItem('order')) {
            let productsCart = [];
            productsCart = localStorage.getItem('order');
            productsCart = JSON.parse(productsCart);
            setCartLength(productsCart.length);
          }
    },[])

    return(
        <div className={s.container}>
            <Navbar open={open} cartLength={cartLength}/>
            <div className={s.content}>
                <div className={s.product}>
                    <div className={s.imagenContainer}>
                        {
                            product.imagen[0] ?
                            <img className={s.imagen} src={product.imagen[options.color]} alt='producto'/> :
                            <img className={s.loading} src={loading} alt='loading'/>
                        }
                    </div>
                    <div className={s.productData}>
                        <h2 className={s.title}>{product.nombre}</h2>
                        <h4 className={s.precio}>${product.precio}</h4>
                        <div className={s.talleContainer}>
                            <p className={s.talleTitle}>Talle:</p>
                            <div className={s.talles}>
                                {product.talle?.map( (t, i) => {
                                    return(
                                        <div className={s.talle} key={i}>{t}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={s.coloresContainer}>
                            <p className={s.colorTitle}>Color:</p>
                            <div className={s.colores}>
                                {product.color?.map( (t, i) => {
                                    return(
                                        <div key={i} className={s.colorImgContainer}>
                                            <img className={s.colorImg} src={product.imagen[i]}  />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button>Agregar al Carrito</button>
                    </div>
                </div>
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