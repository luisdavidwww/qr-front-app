import React, {useEffect, useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';



//logo
import LogoCasagri from "../../../static/casagri-logo-01.svg"

//Estilos
import './Top_header.css'

//icons
import { AiOutlineHome } from "react-icons/ai";




const Navbar = () => {

    //Constantes de todas las categorias
    const allCategories = 'Buscar';

    const [click, setClick] = useState(false);

    //hook que utilizo para llevar el scroll a la parte superior en cada Router
    let location = useLocation();

    const refOne = useRef(undefined);
    const refInput = useRef(null);

    //Metodo click
    const handleClick = () => {
        if(click == false){
            setClick(true);
          }
          if(click == true){
            setClick(false);
          }
    }

     //Escucha cualquier click en el documento para cerrarla ventana de sugerencia del buscador
     const handleclickOutside = (e) => {
        if (!refOne?.current?.contains(e.target) && !refInput?.current?.contains(e.target)) {
          setClick(false);
        }
      };

      useEffect(() => {
        document.addEventListener("click", handleclickOutside, true);
        return () => {
          document.removeEventListener("click", handleclickOutside, true);
        };
      }, []);


    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);



    


  return (
    <>
        <div className='Top_header-Container-Copy'>
            <div className='ContainerHeader'>
                <div className='content-Top'>
                        <Link to='/' className='Link-Top-Header'>
                            {/* Desktop */}
                            <div className='navbar-logo' >
                                {
                                    LogoCasagri != null ? 
                                    (<img src={ LogoCasagri } width={"80px"} height={"80px"} alt="Casagri" />
                                ):
                                    (<Skeleton variant="rectangular" width={64} height={64} />)
                                } 
                            </div> 
                             {/* Movil */}
                            <div className='navbar-logo-movil' >
                                {
                                    LogoCasagri != null ? 
                                    (<img src={ LogoCasagri } width={58} height={58} alt="Casagri" />):
                                    (<Skeleton variant="rectangular" width={64} height={64} />)
                                } 
                            </div> 
                        </Link> 
                </div>
                <div className='content-Top-Op'>
                    <div className='content-Top-options'>
                        <div className='content-Top-options-list'>
                            <div className='content-Top-options-list-link'>
                                <Link to='/' className='content-Top-options-list-link' style={{ textDecoration: 'none'}}>
                                    
                                </Link> 
                            </div>  
                        </div>
                        <div className='content-Top-options-list'>
                            <div className='content-Top-options-list-link'>
                                <Link  to='/company' className='content-Top-options-list-link' style={{ textDecoration: 'none'}}>
                                    
                                </Link> 
                            </div>
                        </div>
                        <div className='content-Top-options-list'>
                            <div className='content-Top-options-list-link'>
                                <Link to="/contact" className='content-Top-options-list-link' style={{ textDecoration: 'none'}}>
                                
                                </Link>  
                            </div>        
                        </div>
                        
                        <div className='content-Top-options-list-searchform-set' ref={ refInput } >
                            <div className='content-Top-options-list-link' style={{ textDecoration: 'none', fontSize: '18.6px',}}>
                                {/* Barra de Busqueda Desplegable */}
                            </div>
                        </div>

                        <div className='content-Top-options-list' >
                            
                             {/* Icono de Busqueda para Buscar */}
                            <div className='content-Top-options-list-link' style={{ textDecoration: 'none', fontSize: '19px', marginLeft:'0.7rem'}} onClick={ () => { handleClick(); }} >
                                {
                                     
                                    click ? (null):(
                                    <Link to="https://www.casagri-group.com/" style={{ textDecoration: 'none'}}>
                                        <AiOutlineHome className='content-top__icon' style={{marginRight:'2rem'}} /> 
                                        <span className='content-Top-options-list-link' style={{marginLeft:'2rem'}} >Home</span> 
                                    </Link> )
                                }
                            </div> 
                        </div>

                    </div>
                </div> 
            </div>    
        </div>
        
    </>
  )
}

export default Navbar;