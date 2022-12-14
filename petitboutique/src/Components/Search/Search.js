import React, {useState, useEffect} from "react";
import s from './Search.module.css';
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Footer from '../Footer/Footer';
import axios from "axios";
import Cart from '../Cart/Cart';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination/Pagination';

export default function Search(){
    const [products, setProducts] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(21);
    const [Modal, open, close] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});
    const skeletonCards = [0,1,2,3,4,5,6,7,8,9];
    let { param } = useParams();
    let currentPosts = [];

    useEffect(()=>{  // Obtengo data de productos
        window.scrollTo(0, 0);
        async function fetchData() {
            setLoading(true);
            let promise = await axios.get(`https://petit-boutique-backend.onrender.com/buscador/${param}`)
            let response = promise.data;
            setProducts(response);
            setLoading(false);
        }
        fetchData();

        if (localStorage.getItem('order')) {
            let productsCart = [];
            productsCart = localStorage.getItem('order');
            productsCart = JSON.parse(productsCart);
            setCartLength(productsCart.length);
        }

    },[]);

    useEffect(()=>{
        window.scrollTo(0, 0);
        async function fetchData() {
            setLoading(true);
            let promise = await axios.get(`https://petit-boutique-backend.onrender.com/buscador/${param}`)
            let response = promise.data;
            setProducts(response);
            setLoading(false);
        }
        fetchData();
    },[param]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if(products){
        if(products[0]){
        currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
        }
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>setLoading(false), 500);
    },[currentPage]);

    return(
        <div className={s.container}>
            <Navbar open={open} cartLength={cartLength}/>
            <div className={s.content}>
                {
                    !loading ? 
                    products[0] ? 
                    <h2 className={s.title}>Resultados para {param}</h2>:
                    <h2 className={s.title}>No hay resultados para {param}</h2> :
                    <h2 className={s.title}>Buscando...</h2>
                }
                <div className={s.data}>
                    <div className={s.filters}>
                        <select className={s.selector}>
                            <option value='default'>Ordenar Por</option>
                            <option value="AZ">A-Z</option>
                            <option value="ZA">Z-A</option>
                            <option value="MAYOR">Mayor Precio</option>
                            <option value="MENOR">Menor Precio</option>  
                        </select>
                        <button className={s.filterBtn}>Ellos</button>
                        <button className={s.filterBtn}>Ellas</button>
                        <button className={s.filterBtn}>Todxs</button>
                    </div>
                    <div className={s.cardsContainer}>
                        <div className={s.cards}>
                            {
                                products && !loading ? 
                                currentPosts?.map((p)=>{
                                    return <Card key={p.id} product={p} setCartLength={setCartLength}/>
                                }) :
                                skeletonCards.map((p, i)=>{
                                    return (
                                        <Transition key={i} timeout={i*50}>
                                            <div  className={s.skeletonCard}>
                                                <div className={s.skeletonImg}/>
                                                <div className={s.skeletonTitle}/>
                                                <div className={s.skeletonTitle2}/>
                                            </div>
                                        </Transition>
                                    )
                                })
                            }
                            {
                                (!products[0] && !loading) &&
                                <div style={{width: '220px', height: '380px'}}></div>
                            }
                        </div>
                        <div className={s.pagination}>
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={products?.length}
                                paginate={paginate}
                            />
                        </div>
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