import React from 'react';
import s from './Home.module.css';
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

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className={s.content}>
        <SwiperMain/>
        <div className={s.categories}>
          <div className={s.category} >
            <img className={s.categoryIMG} src={ellasIMG} alt='Ellas img'/>
            <div className={s.mask} style={{backgroundImage: `url(${categoriaEllas})`}}/>
          </div>
          <div className={s.category} >
            <img className={s.categoryIMG} src={ellosIMG} alt='Ellos img'/>
            <div className={s.mask} style={{backgroundImage: `url(${categoriaEllos})`}}/>
          </div>
          <div className={s.category} >
            <img className={s.categoryIMG} src={todxsIMG} alt='Todos img'/>
            <div className={s.mask} style={{backgroundImage: `url(${categoriaTodxs})`}}/>
          </div>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Nuestros Productos Mas Vendidos</h2>
          <SwiperProducts/>
        </div>
        <div className={s.moduleContainer}>
          <h2 className={s.moduleTitle}>Av. Maipú 825, Vicente López, Buenos Aires</h2>
        </div>
        <Footer/>
      </div>
    </div>
  );
}