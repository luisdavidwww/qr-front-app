import React, { useState, useEffect } from 'react';


//Manejo de Carga y Error
import Loader     from "../components/Loader/Loader";
import ErrorPage  from "../components/Loader/ErrorMessage"; 

//Components
import FormQr     from "../components/FormQr/FormQr";

// Peticiones
import { BANNERSHOME } from '../routers/index';




export const Home = () => {

  //Variables de Carga
  const [loanding, setLoanding] = useState(false);
  const [error, setError] = useState(null); 
  //Variables de Banners
  const [bannerHome, setBannerHome] = useState([]);
  

  //Peticion al servidor
  const checkServerConnection = async () => {
    try {
      setLoanding(true);
      const response = await fetch("https://casagriprueba.casagri-group.com/");
      if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor');
      }
      setLoanding(false);
      setError(null);
      return true;
    } catch (error) {
      setLoanding(false);
      setError(error.message);
      return false;
    }
  };
  

  useEffect(() => {
    document.title= `Genera QR - Casagri`;
    checkServerConnection();
  },[])



  return (
    <div style={{ backgroundColor: '#F9F9F9' }}>
      {loanding ? (
        <Loader />
      ) : error ? (
        <ErrorPage message={error} />
      ) : (
        <>
         <FormQr/>
        </>
      )}
    </div>
  )
}






