import React from "react";
import s from './Search.module.css';
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Footer from '../Footer/Footer';

export default function Search(){

    return(
        <div className={s.container}>
            <Navbar/>
            <div className={s.content}>
                <h2 className={s.title}>Resultados para Buzos</h2>
                <div className={s.data}>
                    <div className={s.filters}>
                        <select className={s.selector}>
                            <option value="AZ">A-Z</option>
                            <option value="ZA">Z-A</option>
                            <option value="MAYOR">Mayor Precio</option>
                            <option value="MENOR">Menor Precio</option>
                            <option selected='default'>Ordenar Por</option>
                        </select>
                        <button className={s.filterBtn}>Ellos</button>
                        <button className={s.filterBtn}>Ellas</button>
                        <button className={s.filterBtn}>Todxs</button>
                    </div>
                    <div className={s.cards}>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}