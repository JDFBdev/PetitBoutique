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
import SwiperProducts from '../SwiperProducts/SwiperProducts';
import ColorName from "../ColorName/ColorName";
import toast from "react-hot-toast";

export default function ProductPage(){
    const [product, setProduct] = useState({nombre: '', categoria: [], talle: [], imagen: [loading], color: [], precio: '', descripcion: ''});
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState({color: 0, talle: 'X'})
    const [cartLength, setCartLength] = useState(0);
    const [Modal, open, close] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    let { param } = useParams();

    useEffect(()=>{  // Obtengo data de productos
        window.scrollTo(0, 0);
        async function fetchData() {
            let promise1 = axios.get(`https://petitboutique-backend.herokuapp.com/buscarProducto/${param}`);
            let promise2 = axios.get(`https://petitboutique-backend.herokuapp.com/todosProductos`);

            Promise.all([promise1, promise2]).then(values=>{
                setProduct(values[0].data);
                setProducts(values[1].data);
            })
            
        }
        fetchData();

        if (localStorage.getItem('order')) {
            let productsCart = [];
            productsCart = localStorage.getItem('order');
            productsCart = JSON.parse(productsCart);
            setCartLength(productsCart.length);
          }
    },[param]);

    const handleCarrito = function(){

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
                                        <div className={options.talle === t ? s.selectedTalle : s.talle} key={i} onClick={()=>setOptions((prev)=>({...prev, talle: t}))} >{t}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={s.coloresContainer}>
                            <p className={s.colorTitle}>Color:</p>
                            <div className={s.colores}>
                                {product.color?.map( (t, i) => {
                                    return(
                                        <div style={{border: options.color === i ? '1px solid black' : '1px solid white'}} key={i} className={s.colorImgContainer} onClick={()=>setOptions((prev)=>({...prev, color: i}))}>
                                            <img className={s.colorImg} src={product.imagen[i]} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button className={s.btnCart} onClick={handleCarrito}>Agregar al Carrito</button>
                    </div>
                </div>
                <div className={s.divider}/>
                <div className={s.descripcionContainer}>
                    <h3 className={s.descripcionTitle}>Descripción:</h3>
                    <p className={s.descripcion}>D asdfnas dfsa df sadf sad fs sda sad fsad sa sf adf sdf s dffsdfs df sfsdf sdf sd sd df asd fsa df asdf asd fas df sadf asdf as dfs dfasd fasdasdfs df</p>
                </div>
                <div className={s.divider}/>
            </div>
            <div className={s.moduleContainer}>
                <h2 className={s.moduleTitle}>Productos Similares</h2>
                <SwiperProducts products={products} setCartLength={setCartLength}/>
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