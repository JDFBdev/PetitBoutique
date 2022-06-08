import React from "react";
import s from './Slide.module.css'
import green from '../../img/slideGreen.png';
import purple from '../../img/slidePurple.png';
import blue from '../../img/slideBlue.png';
import img1 from '../../img/slideIMG1.jpg';
import img2 from '../../img/slideIMG2.jpg';
import img3 from '../../img/slideIMG3.jpg';

const data = [{
    title: 'Nuevos Ingresos!',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    div: green,
    img: img1
},
{
    title: 'Llego el Invierno!',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    div: purple,
    img: img2
},
{
    title: 'Ya no se que poner jaja',
    text: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    div: blue,
    img: img3
}

]


export default function Slide({selector}) {

    return(
        <div className={s.container}>
            <div className={s.div} style={{backgroundImage: `url(${data[selector].div})`}}>
                <div className={s.data}>
                    <h2 className={s.title}>{data[selector].title}</h2>
                    <p className={s.text}>{data[selector].text}</p>
                </div>
            </div>
            <img className={s.img} src={data[selector].img} alt='slide img'/>
        </div>
    )
}