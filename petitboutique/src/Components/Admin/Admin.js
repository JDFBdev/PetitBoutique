import React, { useState, useEffect } from "react";
import s from './Admin.module.css';
import AdminCard from "./AdminCard/AdminCard";
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import Logo from '../../img/Petit Boutique.png';
import Card from "../Card/Card";
import loading from '../../img/loading.gif';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/Firebase";
import toast from 'react-hot-toast';
import axios from 'axios';
import { CompactPicker } from 'react-color';
import ColorName from "../ColorName/ColorName";

const selector = ['B0-6', 'B6-12', 'B12-18', 'B18-24',2,4,6,8,10,12,14,16];

export default function Admin(){
    const [input, setInput] = useState({title: '', categories: [], talles: [], files: [], colores: [], precio: ''});
    const [url, setUrl] = useState([]);
    const [color, setColor] = useState({id: '', name: 'Black'});
    const [modifyUrl, setModifyUrl] = useState('');
    const [selected, setSelected] = useState({nombre: '', categoria: [], talle: [], imagen: [], color: [], precio: '', id: -1});
    const [selectedImagePreview, setSelectedImagePreview] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [products, setProducts] = useState([]);
    const [skeletonCards] = useState([1,2,3,4,5,6,7,8]);

    const [Modal, open] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalDelete, openDelete, closeDelete] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalLoading, openLoading, closeLoading] = useModal('root', { preventScroll: true, closeOnOverlayClick: false});

    useEffect(()=>{  // Obtengo data de productos
        window.scrollTo(0, 0);
        async function fetchData() {
            let promise = await axios.get(`https://petitboutique-backend.herokuapp.com/todosProductos`)
            let response = promise.data;
            setProducts(response);
        }
        fetchData();
    },[])

    const handleInput = function(e){  // Estado de inputs
        if (e.target.id === 'title' || e.target.id === 'precio'){
            setInput(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
        } else if (!input[e.target.id].includes(e.target.value) && e.target.value !== 'default'){
            setInput(prevInput => ({...prevInput, [e.target.id]: [...prevInput[e.target.id], e.target.value]}));
        }
    }

    const handleColor = function(e){
        e.preventDefault();
        setInput(prevInput => ({...prevInput, colores: [...prevInput['colores'], color.id]}));
    }

    const handleCloseCategory = function(e){
        setInput((prev)=>({...prev, categories: prev.categories.filter(function(c) { 
            return c !== e
        })}));
    }

    const handleCloseCategorySelected = function(e){
        setSelected((prev)=>({...prev, categoria: prev.categoria.filter(function(c) { 
            return c !== e
        })}));
    }

    const handleInputSelected = function(e){  // Estado de inputs
        if (e.target.id === 'nombre' || e.target.id === 'precio'){
            setSelected(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
        } else if (!selected[e.target.id].includes(e.target.value) && e.target.value !== 'default'){
            setSelected(prevInput => ({...prevInput, [e.target.id]: [...prevInput[e.target.id], e.target.value]}));
        }
    }

    const handleCloseTalle = function(e){
        setInput((prev)=>({...prev, talles: prev.talles.filter(function(c) { 
            return c !== e
        })}));
    }

    const handleCloseTalleSelected = function(e){
        setSelected((prev)=>({...prev, talle: prev.talle.filter(function(c) { 
            return c !== e
        })}));
    }

    const handleFile = function(e){  // Guardo la imagen en un estado y seteo el preview
        if(e.target.files[0]){
            setInput(prev=>({...prev, files: [...prev['files'], e.target.files[0]]}));
            setImagePreview((prev)=>([...prev, URL.createObjectURL(e.target.files[0])]));
        }
    }

    const handleSelectedFile = function(e){   // Guardo la imagen a modificar en un estado y seteo el preview
        if(e.target.files[0]){
            setSelected(prev=>({...prev, file: e.target.files[0]}));
            setSelectedImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleCreate = function(e){  // Posteo la imagen a firebase, despues se activa el useffect de abajo
        e.preventDefault();
        openLoading();

        if (!input.files[0]) return;
            input.files.forEach(async (f)=>{
                const imageRef = ref(storage, `images/${f.name}`);
                uploadBytes(imageRef, f).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl((prev)=>([...prev, url]));
                });
            });
        })
    }

    useEffect(()=>{  // Si se guardo la imagen de firebase, vamos a handleSubmit
        if ( url[0] && url.length === input.files.length ){
            let orden = [];
            input.files.forEach(f=>{
                url.forEach(u=>{
                    if (u.includes(f.name)){
                        orden.push(u);
                    }
                })
            })
            hanldeSubmit(orden);
        }
    },[url]);

    const hanldeSubmit = async function(url){  // Posteamos el producto
        let promise = await axios.post(`https://petitboutique-backend.herokuapp.com/crearProducto`,{
            nombre: input.title,
            imagen: url,
            precio: input.precio,
            categoria: input.categories,
            color: input.colores,
            talle: input.talles
        })
        let response = promise.data;
        if (!response.success){
            closeLoading();
            toast.error('Error al registrar el producto');
            console.log(response.err);
            
        }
        else{
            closeLoading();
            toast.success('Producto registrado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        
    }

    useEffect(()=>{  // Si se subio la imagen a modificar a firebase, vamos al submit
        if ( modifyUrl && modifyUrl !== '' ) handleSubmitModificar(true);
    },[modifyUrl])

    const handleSubmitModificar = async function(e){  // Posteamos el cambio, con imagen anterior o con imagen nueva
        e.preventDefault();
        openLoading();

        let promise = await axios.post(`https://petitboutique-backend.herokuapp.com/editarProducto`,{
            nombre: selected.nombre,
            imagen: selected.imagen,
            precio: selected.precio,
            categoria: selected.categoria,
            color: selected.color,
            talle: selected.talle,
            id: selected.id
        })
        let response = promise.data;
        if (!response.success){
            closeLoading();
            toast.error('Error al modificar el producto');
            console.log(response.err);
        }
        else{
            closeLoading();
            toast.success('Producto modificado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    const handleDelete = async function(e){  // Borramos el producto
        e.preventDefault();
        openLoading();
        let promise = await axios.post(`https://petitboutique-backend.herokuapp.com/borrarProducto`,{
            id: selected.id
        })
        let response = promise.data;
        if (!response.success){
            closeLoading();
            toast.error('Error al eliminar el producto');
            console.log(response.err);
        }
        else{
            closeLoading();
            toast.success('Producto eliminado correctamente');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return(
        <div className={s.container}>
            <img className={s.logo} src={Logo} alt='Petit Logo'/>
            <h1 className={s.moduleTitle}>Crear Producto</h1>
            <div className={s.create}>
                <form className={s.form} onSubmit={handleCreate}>

                    <div className={s.inputContainer}>
                        <input className={s.input} id='title' type='text' placeholder="Titulo..." onChange={handleInput}/>
                    </div>
                    <div className={s.inputContainer}>
                        <input className={s.input} id='precio' type='number' placeholder="Precio..." onChange={handleInput}/>
                    </div>

                    <div className={s.categories}>
                        <select className={s.input} id='categories' onChange={handleInput}>
                            <option value='default'>Seleccionar Categoria</option>
                            <option value='pantalones'>Pantalones</option>
                            <option value='remeras'>Remeras</option>
                            <option value='bebes'>Bebes</option>
                            <option value='vestidos'>Vestidos</option>
                            <option value='accesorios'>Accesorios</option>
                            <option value='abrigos'>Abrigos</option>
                            <option value='nenes'>Nenes</option>
                            <option value='nenas'>Nenas</option>
                            <option value='unisex'>Unisex</option>
                        </select>
                        <div className={s.categoriesContainer}>
                        {
                            input.categories?.map((c)=>{
                                return <div className={s.category} key={c}>
                                    <p className={s.categoryText}>{c}</p>
                                    <p className={s.categoryTextClose} onClick={()=>handleCloseCategory(c)}>X</p>
                                </div>
                            })
                        }
                        </div>
                    </div>
                    
                    <div className={s.talles}>
                        <select className={s.input} id='talles' onChange={handleInput}>
                            <option value='default'>Seleccionar Talles</option>
                            {
                                selector.map((o)=>{
                                    return <option value={o} key={o} >{o}</option>
                                })
                            }
                        </select>
                        <div className={s.tallesContainer}>
                        {
                            input.talles?.map((t)=>{
                                return <div className={s.talle} key={t}>
                                    <p className={s.talleText}>{t}</p>
                                    <p className={s.talleTextClose} onClick={()=>handleCloseTalle(t)}>X</p>
                                </div>
                            })
                        }
                        </div>
                    </div>

                    <div className={s.colores}>
                        <div className={s.colorSelector}>
                            <CompactPicker id='colores' type='color' placeholder="Seleccionar Colores" onChange={(e)=>{setColor({id: e.hex, name: ColorName(e.hex)})}}/>
                            {
                                input.colores.length === input.files.length && color.id !== '' && input.colores.length < 6 ?
                                <button className={s.btnAgregarColor} onClick={handleColor}>Agregar {color.name}</button>:
                                <button className={s.btnAgregarColorError} onClick={(e)=>{e.preventDefault();}}>Agregar</button>
                            }
                            
                        </div>
                        {
                            input.colores?.map((c,i)=>{
                                return (
                                <div key={i}>
                                    { !input.files[i] &&
                                    <div className={s.color} style={{backgroundColor: c}} >
                                        <div className={s.fileWrapper}>
                                            <input className={s.file} id='file' type='file' onChange={handleFile}/>
                                        </div>
                                    </div>
                                    }
                                </div>
                                )
                            })
                        }
                    </div>
                    {
                        ((input.title !== '' && input.files[0] && input.categories[0] && input.colores[0] && input.precio !== '' && input.talles[0] && (input.colores.length === input.files.length))) ?
                        <button className={s.btnSubmit} type='submit'>Crear Producto</button>:
                        <button className={s.btnSubmitError} type='button' onClick={()=>{}}>Crear Producto</button>
                    }
                </form>
                <Card product={{nombre: input.title, categoria: input.categories, talle: input.talles, color: input.colores, precio: input.precio, imagen: imagePreview}} disableCart={true}/>
            </div>
            {/* <div className={s.browser}>
                <form className={s.search}>
                    <input className={s.input} placeholder='Encontra lo que buscas...'/>
                    <div className={s.lupaContainer}>
                        <img className={s.lupa} src={Lupa} alt='Lupa'/>
                    </div>
                </form>
            </div> */}
            <h1 className={s.moduleTitle}>Todos los Productos</h1>
            <div className={s.cards}>
                {
                    products[0] ?
                    products?.map((p, i)=>{
                        return <Transition key={p.id} timeout={i*50}><AdminCard product={p} open={open} setSelected={setSelected} setSelectedImagePreview={setSelectedImagePreview}/></Transition>
                    }) : 
                    skeletonCards.map((p, i)=>{
                        return <Transition key={i} timeout={i*50}>
                        <div className={s.skeletonCard} >
                            <div className={s.skeletonImg}/>
                            <div className={s.skeletonTitle}/>
                        </div></Transition>
                    })
                }
            </div>
            <Modal>
                <Transition>
                    <div className={s.create}>
                        <form className={s.formModal}>
                            <h3 className={s.modalTitle}>Modificar Producto</h3>

                            <div className={s.inputContainer}>
                                <input className={s.input} value={selected.nombre} id='nombre' type='text' placeholder="Titulo..." onChange={handleInputSelected}/>
                            </div>
                            <div className={s.inputContainer}>
                                <input className={s.input} value={selected.precio} id='precio' type='number' placeholder="Precio..." onChange={handleInputSelected}/>
                            </div>

                            <div className={s.categories}>
                                <select className={s.input} id='categoria' onChange={handleInputSelected}>
                                    <option value='default'>Seleccionar Categoria</option>
                                    <option value='pantalones'>Pantalones</option>
                                    <option value='remeras'>Remeras</option>
                                    <option value='bebes'>Bebes</option>
                                    <option value='vestidos'>Vestidos</option>
                                    <option value='accesorios'>Accesorios</option>
                                    <option value='abrigos'>Abrigos</option>
                                    <option value='nenes'>Nenes</option>
                                    <option value='nenas'>Nenas</option>
                                    <option value='unisex'>Unisex</option>
                                </select>
                                <div className={s.categoriesContainer}>
                                {
                                    selected.categoria?.map((c)=>{
                                        return (
                                            <div className={s.category} key={c}>
                                                <p className={s.categoryText}>{c}</p>
                                                <p className={s.categoryTextClose} onClick={()=>handleCloseCategorySelected(c)}>X</p>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div className={s.talles}>
                                <select className={s.input} id='talle' onChange={handleInputSelected}>
                                    <option value='default'>Seleccionar Talles</option>
                                    {
                                        selector.map((o)=>{
                                            return <option value={o} key={o} >{o}</option>
                                        })
                                    }
                                </select>
                                <div className={s.tallesContainer}>
                                {
                                    selected.talle?.map((t)=>{
                                        return <div className={s.talle} key={t}>
                                            <p className={s.talleText}>{t}</p>
                                            <p className={s.talleTextClose} onClick={()=>handleCloseTalleSelected(t)}>X</p>
                                        </div>
                                    })
                                }
                                </div>
                            </div>
                            <button className={s.btnDelete} onClick={(e)=>{e.preventDefault(); openDelete();}}>Eliminar Producto</button>
                            <button className={s.btnSubmit} type='submit' onClick={handleSubmitModificar}>Modificar Producto</button>
                        </form>
                        <Card product={{...selected, imagen: selectedImagePreview[0] ? selectedImagePreview : selected.imagen}} disableCart={true}/>
                    </div>
                </Transition>
            </Modal>
            <ModalDelete>
                <Transition>
                    <div className={s.modalDelete}>
                        <h3 className={s.modalTitle}>Esta seguro que desea<br/>eliminar el producto?</h3>
                        <button className={s.btnCancel} type='submit' onClick={(e)=> {e.preventDefault(); closeDelete();}}>Cancelar</button>
                        <button className={s.btnDelete} type='submit' onClick={handleDelete}>Eliminar Producto</button>
                    </div>
                </Transition>
            </ModalDelete>
            <ModalLoading>
                <Transition>
                    <div className={s.loadingDiv}>
                        <img className={s.loadingGif} src={loading} alt='Loading gif' />
                    </div>
                </Transition>
            </ModalLoading>
        </div>
    )
}