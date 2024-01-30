

import React, { useEffect, useState } from 'react';

//icons
import { AiOutlineWarning, AiOutlineSync } from "react-icons/ai" ;  

const ErrorPage = ({message}) => {

  useEffect(() => {
    document.title= `Error Conexión - Casagri`
  },[])


    return (
        <div style={{backgroundColor:'#F9F9F9'}}>
            <>

                    {/*Titulo de Resultado Desktop */}
                    <div className='result__Search__Container' data-aos="fade-left" data-aos-once="true"  >
                        <div className='result__Search text__Result__Category'> 
                            <span style={{fontWeight:'800', fontSize:'29px', marginTop:'7rem'}}> 
                              <AiOutlineWarning style={{fontSize:'70px', marginLeft:'5rem', marginRight:'2rem', marginBottom:'0.3rem', color:'#e8970b'}}/> 
                              Error al cargar la página 
                            </span>  
                        </div> 
                    </div>
    
                    {/*Titulo de Resultado Movil */}
                    <div className='result__Category__Container__Movil' data-aos="zoom-in" data-aos-once="true" >
                      <div className='result__Category__Movil text__Result__Category__Movil'> 
                        <>
                          <p style={{fontWeight:'800', fontSize:'30px', paddingTop:'13rem', marginBottom:'-5rem', textAlign:'center'}}>
                            <AiOutlineWarning style={{fontSize:'80px', marginLeft:'0.2rem',marginRight:'1rem', marginBottom:'1rem', color:'#e8970b'}}/> <br />
                            Error al cargar la página
                          </p> 
                        </>
                      </div>
                    </div>

                    {/*Contenido de Sección */}
                    <div className='category__Container'>
                    {/* Resultado de Busqueda */}
                    <>
                        <div style={{ display:'inline-block', height:'10vh', justifyContent:'center', textAlign:'center', marginTop:'7rem', marginBottom:'10rem' }} data-aos="zoom-in" data-aos-once="true" >
                            No pudimos acceder a la página.  <br />
                            <span style={{fontWeight:'700', marginTop:'3rem'}}  >  
                              Por favor, inténtalo de nuevo. {message}
                            </span> 
                        </div>
                        
                    </>
                    </div>

                  </>
        </div>
      )
    }

export default ErrorPage;