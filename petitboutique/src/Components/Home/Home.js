import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import Navbar from '../Navbar/Navbar';
import SwiperMain from '../SwiperMain/SwiperMain';
import SwiperProducts from '../SwiperProducts/SwiperProducts';
import categoriaEllas from '../../img/categoriaEllas.png';
import categoriaEllos from '../../img/categoriaEllos.png';
import categoriaTodxs from '../../img/categoriaTodxs.png';
import categoriaBlue from '../../img/categoriaBlue.png';
import categoriaGreen from '../../img/categoriaGreen.png';
import categoriaPurple from '../../img/categoriaPurple.png';
import ellasIMG from '../../img/ellasIMG.jpg';
import ellosIMG from '../../img/ellosIMG.jpg';
import todxsIMG from '../../img/todxsIMG.jpg';
import remeras from '../../img/remeras.png';
import pantalones from '../../img/pantalones.png';
import vestidos from '../../img/vestidos.png';
import accesorios from '../../img/accesorios.png';
import abrigos from '../../img/abrigos.png';
import bebes from '../../img/bebes.png';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

export default function Home() {
  const Navigate = useNavigate();
  const [products, setProducts] = useState();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })
  const [Modal, open] = useModal('root', { preventScroll: false, closeOnOverlayClick: true});

  useEffect(()=>{  // Obtengo data de productos
    window.scrollTo(0, 0);
    async function fetchData() {
      let promise = await axios.get(`https://petitboutique-backend.herokuapp.com/todosProductos`)
      let response = promise.data;
      setProducts(response);
    }
    fetchData();
  },[])

  return (
    <div>
      <Navbar open={open}/>
      <div className={s.content}>
        <SwiperMain/>
        <div className={s.categories}>
          { !isTabletOrMobile ? 
            <>
              <div className={s.category} onClick={()=>Navigate('/Search/Ellas')} >
                <img className={s.categoryIMG} src={ellasIMG} alt='Ellas img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllas})`}}/>
              </div>
              <div className={s.category} onClick={()=>Navigate('/Search/Ellos')}>
                <img className={s.categoryIMG} src={ellosIMG} alt='Ellos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllos})`}}/>
              </div>
              <div className={s.category} onClick={()=>Navigate('/Search/Todxs')}>
                <img className={s.categoryIMG} src={todxsIMG} alt='Todos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaTodxs})`}}/>
              </div>
            </> : 
            <>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search/Remeras')} >
                <img className={s.categoryIMG} src={remeras} alt='Remeras'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaBlue})`}}/>
              </div>
              <p className={s.categoryLabel}>Remeras</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search/Pantalones')} >
                <img className={s.categoryIMG} src={pantalones} alt='Pantalones'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaPurple})`}}/>
              </div>
              <p className={s.categoryLabel}>Pantalones</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search/Vestidos')} >
                <img className={s.categoryIMG} src={vestidos} alt='Vestidos'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaGreen})`}}/>
              </div>
              <p className={s.categoryLabel}>Vestidos</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search/Accesorios')} >
                <img className={s.categoryIMG} src={accesorios} alt='Accesorios'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaGreen})`}}/>
              </div>
              <p className={s.categoryLabel}>Accesorios</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search/Abrigos')} >
                <img className={s.categoryIMG} src={abrigos} alt='Abrigos'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaBlue})`}}/>
              </div>
              <p className={s.categoryLabel}>Abrigos</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search/Bebes')} >
                <img className={s.categoryIMG} src={bebes} alt='Bebes'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaPurple})`}}/>
              </div>
              <p className={s.categoryLabel}>Bebes</p>
            </div>
          </>
          }
        </div>
        {
          isTabletOrMobile && 
          <div className={s.moduleContainer}>
            <div className={s.genero} onClick={()=>Navigate('/Search/Ellas')}>
                <div>
                  <img className={s.IMGGenero} src={ellasIMG} alt='Ellas img'/>
                  <div className={s.maskGenero} style={{backgroundImage: `url(${categoriaEllas})`}}/>
                </div>
                <div className={s.generoTitleContainer}>
                  <h3 className={s.generoTitle}>Para Ellas</h3>
                </div>
            </div>
            <div className={s.genero} onClick={()=>Navigate('/Search/Ellos')}>
                <div>
                  <img className={s.IMGGenero} src={ellosIMG} alt='Ellos img'/>
                  <div className={s.maskGenero} style={{backgroundImage: `url(${categoriaEllos})`}}/>
                </div>
                <div className={s.generoTitleContainer}>
                  <h3 className={s.generoTitle}>Para Ellos</h3>
                </div>
            </div>
            <div className={s.genero} onClick={()=>Navigate('/Search/Todxs')}>
                <div>
                  <img className={s.IMGGenero} src={todxsIMG} alt='Todos img'/>
                  <div className={s.maskGenero} style={{backgroundImage: `url(${categoriaTodxs})`}}/>
                </div>
                <div className={s.generoTitleContainer}>
                  <h3 className={s.generoTitle}>Para Todxs!</h3>
                </div>
            </div>
          </div>
        }
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Nuestros Productos Mas Vendidos</h2>
          <SwiperProducts products={products}/>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Av. Maipú 825, Vicente López, Buenos Aires</h2>
          <iframe title='Maps' src={`https://maps.google.com/maps?q=-34.530231,-58.480009&output=svembed`} className={s.iframe} allowFullScreen></iframe>
        </div>
        <Footer/>
      </div>
      <Modal>
        <Transition>
          <Cart/>
        </Transition>
      </Modal>
    </div>
  );
}