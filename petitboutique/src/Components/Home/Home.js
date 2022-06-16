import React from 'react';
import s from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SwiperMain from '../SwiperMain/SwiperMain';
import SwiperProducts from '../SwiperProducts/SwiperProducts';
import categoriaEllas from '../../img/categoriaEllas.png';
import categoriaEllos from '../../img/categoriaEllos.png';
import categoriaTodxs from '../../img/categoriaTodxs.png';
import ellasIMG from '../../img/ellasIMG.jpg';
import ellosIMG from '../../img/ellosIMG.jpg';
import todxsIMG from '../../img/todxsIMG.jpg';
import Footer from '../Footer/Footer';
import { useMediaQuery } from 'react-responsive';

export default function Home() {
  const Navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })

  return (
    <div>
      <Navbar/>
      <div className={s.content}>
        <SwiperMain/>
        <div className={s.categories}>
          { !isTabletOrMobile ? 
            <>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={ellasIMG} alt='Ellas img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllas})`}}/>
              </div>
              <div className={s.category} onClick={()=>Navigate('/Search')}>
                <img className={s.categoryIMG} src={ellosIMG} alt='Ellos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllos})`}}/>
              </div>
              <div className={s.category} onClick={()=>Navigate('/Search')}>
                <img className={s.categoryIMG} src={todxsIMG} alt='Todos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaTodxs})`}}/>
              </div>
            </> : 
            <>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={ellasIMG} alt='Ellas img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllas})`}}/>
              </div>
              <p className={s.categoryLabel}>Remeras</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={ellosIMG} alt='Ellos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllos})`}}/>
              </div>
              <p className={s.categoryLabel}>Pantalones</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={todxsIMG} alt='Todos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaTodxs})`}}/>
              </div>
              <p className={s.categoryLabel}>Vestidos</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={ellasIMG} alt='Ellas img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaTodxs})`}}/>
              </div>
              <p className={s.categoryLabel}>Accesorios</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={ellosIMG} alt='Ellos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllas})`}}/>
              </div>
              <p className={s.categoryLabel}>Abrigos</p>
            </div>
            <div className={s.categoryContainer}>
              <div className={s.category} onClick={()=>Navigate('/Search')} >
                <img className={s.categoryIMG} src={todxsIMG} alt='Todos img'/>
                <div className={s.mask} style={{backgroundImage: `url(${categoriaEllos})`}}/>
              </div>
              <p className={s.categoryLabel}>Bebes</p>
            </div>
          </>
          }
        </div>
        {
          isTabletOrMobile && 
          <div className={s.moduleContainer}>
            <div className={s.genero}>
                <div>
                  <img className={s.IMGGenero} src={ellasIMG} alt='Ellas img'/>
                  <div className={s.maskGenero} style={{backgroundImage: `url(${categoriaEllas})`}}/>
                </div>
                <div className={s.generoTitleContainer}>
                  <h3 className={s.generoTitle}>Para Ellas</h3>
                </div>
            </div>
            <div className={s.genero}>
                <div>
                  <img className={s.IMGGenero} src={ellosIMG} alt='Ellos img'/>
                  <div className={s.maskGenero} style={{backgroundImage: `url(${categoriaEllos})`}}/>
                </div>
                <div className={s.generoTitleContainer}>
                  <h3 className={s.generoTitle}>Para Ellos</h3>
                </div>
            </div>
            <div className={s.genero}>
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
          <SwiperProducts/>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Av. Maipú 825, Vicente López, Buenos Aires</h2>
          <iframe title='Maps' src={`https://maps.google.com/maps?q=-34.530231,-58.480009&output=svembed`} className={s.iframe} allowFullScreen></iframe>
        </div>
        <Footer/>
      </div>
    </div>
  );
}