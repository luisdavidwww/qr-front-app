
import React, {useState, useEffect,useContext } from 'react';
import { useForm } from '../../hooks/useForm.tsx';
import { AuthContext } from '../../context/AuthContext.tsx';
import axios from 'axios';

//Manejo de Carga y Error
import Loader     from "../../components/Loader/Loader.jsx";
import ErrorPage  from "../../components/Loader/ErrorMessage"; 
import TransitionAlerts  from "../../components/Alert/TransitionAlerts.jsx"; 
import OutlinedAlerts  from "../../components/Alert/OutlinedAlerts.jsx"; 

//Estilos y diseño 
import './FormQr.css'
import './FormTips.css'

//imagenes
import imgQr from '../../static/img/qr.png';


//icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


function isValidEmail(email) {
  // Expresión regular para validar un correo electrónico
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  // Usamos test() para verificar si el correo electrónico coincide con la expresión regular
  return emailRegex.test(email);
}


const FormQr = () => {


  //PETICIÓN DEL QR
  const [dataQr, setDataQr] = useState("");

  //Variables de uso
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [alertExito, setAletExito] = useState("");
  const [errorTrim, setErrorTrim] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [messageContraseña, setMessageContraseña] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  //Mensaje de Bienvenida
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);


  //variables de carga de estado
  const [loanding, setLoanding] = useState(false);


  /* Hook de formulario */
  const { name, email, password, lastName, titulo, telefono, onChange, onChangeNumber } = useForm({
    name: '',
    email: '',
    lastName: '',
    titulo: 'Vendedor Autorizado',
    password: ''
  });


  

  // Verifica si todos los campos obligatorios están llenos
  const checkFormValidity = () => {
      if (name && lastName && email && telefono && password && titulo ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
  };

  /* Función del contexto */
  const {
    errorMessage,
    loader,
    signIn,
    removeError,
    // Otros valores necesarios del contexto, como token, usuario, etc.
  } = useContext(AuthContext);


  /* Método Para generar el QR */
  const onGeneratorQR = async() => {


    // Variable para rastrear si hay errores
    let hasError = false; 

    //VALIDAR EMAIL
    if (email.trim() === '') {
      setErrorTrim(true);
      setMessageEmail("Por favor, ingrese un correo electrónico.");
      hasError = true; // Marca un error si el campo de correo electrónico está vacío
    } else if (!isValidEmail(email)) {
      setErrorTrim(true);
      setMessageEmail("Por favor, ingrese un correo electrónico válido.");
      hasError = true; // Marca un error si el correo electrónico no es válido
    } else {
      setMessageEmail(""); // Borra el mensaje de error si no hay errores en el correo electrónico
    }

    // Si no hay errores
    if (!hasError) {

      //Se Borra la variable de errores
      setErrorTrim(false);

      //Se Borra la variable de errores
      setErrorTrim(false);

      RegisterQR();

    }
  };


  //Peticion para generar el Qr
  const RegisterQR = async() => {

    const headers = {
      'Content-Type': 'application/json',
    };

    //datos de vendedor
    let dataToSend = {
      "nombre": name,
      "apellido": lastName,
      "telefono": telefono,
      "email": email,
      "titulo": titulo,
      "password": password
    };

    //Empieza a cargar la solicitud
    setLoanding(true);
    

    try {
      const response = await axios.post(
        `https://casagriprueba.casagri-group.com/api/usuarios/generarQR`,
        dataToSend,
        { headers }
      );
      //Caso Exitoso
      if ( response.status == 200 ) {

        //Manejo de variables decarga y errores
        setLoanding(false);
        setError("");
        setAletExito("⚡ Rapidez absoluta ⚡ ya puedes descargar tu QR! 😊 ")

        //se guarda el QR
        setDataQr(response.data);

      } else {
        //Error
        setError("Error:", response);
        setAletExito("");

      }
    } catch (error) {

      if (error.response) {
       // El servidor respondió con un código de estado diferente de 200
       setLoanding(false);
       setError(error.response.data.error);
       setAletExito("");
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        setLoanding(false);
        setError(error.response.data.error);
        setAletExito("");
      } else {
        // Error en la configuración de la solicitud o en la creación de la instancia de Axios
        setLoanding(false);
        setError(error.message);
        setAletExito("");
      }
    } 
};


  // Función para manejar la descarga de la imagen
  const handleDownloadImage = () => {
    // Crea un elemento <a> temporal
    const link = document.createElement('a');
    // Establece el atributo href con la URL de la imagen
    link.href = dataQr;
    // Establece el atributo download para indicar que es una descarga
    link.download ='QrVendedorCasagri.jpg'; // Reemplaza 'nombre_de_la_imagen.jpg' con el nombre que deseas para la imagen descargada
    // Simula un clic en el elemento <a> temporal para iniciar la descarga
    document.body.appendChild(link);
    link.click();
    // Elimina el elemento <a> temporal del DOM
    document.body.removeChild(link);
  };



  useEffect(() => {
    checkFormValidity();
  }, [name, lastName, email, telefono, password, titulo ]);

  useEffect(() => {
    // Verifica si errorMessage tiene un valor definido y su longitud es mayor que cero
    if (errorMessage && errorMessage.length > 0) {
      setError(errorMessage);
      /*window.alert('Login incorrecto: ' + errorMessage);*/
      removeError();
    }
  }, [errorMessage]);





  return (
    <>
      {loanding ? (
        <Loader />
      ) : (
        <>
          <div className='body-container'>
            {/* ----------- Desktop ----------------*/}
            <h1 className='title-basic-start'> 
            Convierte tu información en <br />
            <span style={{color:'#489B1E'}}> Códigos QR</span></h1>

            

            <div className='us-container' >
                {/* Info */}
                <div className='us-wrap-Info' >
               
                    {/* Nombres */}
                    <div className='Container__Label-Email'>
                        <label htmlFor='name' className='Label__Form'>
                          Nombre
                        </label>
                        <input
                          type='text'
                          className='Input__Form'
                          id='name'
                          placeholder='Ingrese el Nombre'
                          value={name}
                          autoComplete='off'
                          onChange={(e) => onChange(e.target.value, 'name','letters')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onGeneratorQR();
                            }
                          }}
                          
                        />
                    </div>

                    {/* Apellidos */}
                    <div className='Container__Label-Email'>
                        <label htmlFor='lastName' className='Label__Form'>
                          Apellido
                        </label>
                        <input
                          type='text'
                          className='Input__Form'
                          id='lastName'
                          placeholder='Ingrese su Apellido'
                          value={lastName}
                          autoComplete='off'
                          onChange={(e) => onChange(e.target.value, 'lastName', 'letters')}  
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onGeneratorQR();
                            }
                          }}
                        />
                    </div>  

                    {/* Telefono */}
                    <div className='Container__Label-Email'>
                      <label htmlFor='telefono' className='Label__Form'>
                        Teléfono
                      </label>
                      <input
                        type='number'
                        className='Input__Form'
                        id='telefono'
                        placeholder='Teléfono'
                        value={telefono} 
                        autoComplete='off'
                        inputMode='numeric' /* Establecer inputMode en "numeric" */
                        onFocus={(e) => {
                          e.target.setAttribute('inputmode', 'numeric');
                        }}
                        onChange={(e) => {
                          // Aquí puedes realizar la validación adicional según tus necesidades
                          const inputValue = e.target.value;
                          onChangeNumber(inputValue, 'telefono', 'number' );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onGeneratorQR();
                          }
                        }}
                        
                      />
                    </div>

                    {/* Correo */}
                    <div className='Container__Label-Email'>
                      <label htmlFor="email" className='Label__Form'>Correo Electrónico</label>
                      <input
                        type="text"
                        className={errorTrim && messageEmail ? 'Input__Form-Error':'Input__Form'}
                        id="email"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChange={(e) => onChange(e.target.value, 'email')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onGeneratorQR();
                          }
                        }}
                        autoComplete="off"
                      />
                      {errorTrim && messageEmail && (
                        <div className='Mensaje__Error'>
                          <div className='MensajeError__Input' style={{position:"absolute"}}>{messageEmail}</div>
                          {/*<OutlinedAlerts ErrorMessage={messageEmail} />*/}
                        </div>
                      )}

                      
                    </div>

                    {/* Titulo */}
                    <div className='Container__Label-Email'>
                        <label htmlFor='lastName' className='Label__Form'>
                          Titulo
                        </label>
                        <input
                          type='text'
                          className='Input__Form'
                          id='titulo'
                          placeholder='Titulo deseado'
                          value={titulo}
                          autoComplete='off'
                          onChange={(e) => onChange(e.target.value, 'titulo', 'letters')}  
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onGeneratorQR();
                            }
                          }} 
                        />
                    </div>  

                    {/* Contraseña */}
                    <div className='Container__Label'>
                      <label htmlFor="password" className='Label__Form'>Autorización</label>
                      <div className='PasswordInputContainer'>
                        <input
                          type={showPassword ? 'text' : 'password'} // Cambia el tipo de entrada según el estado showPassword
                          className={messageContraseña.length > 0 ? 'Input__Form-Error':'Input__Form'}
                          id="password"
                          placeholder="Ingrese el código de autorización"
                          value={password}
                          onChange={(e) => onChange(e.target.value, 'password')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onGeneratorQR();
                            }
                          }}
                          autoComplete="off"
                        />
                        <div
                          className='ShowPasswordIcon' // Estilo para el ícono de mostrar/ocultar contraseña
                          onClick={() => setShowPassword(!showPassword)} // Cambia el estado showPassword al hacer clic en el ícono
                        >
                          {showPassword ? <AiFillEye className='iconJustify'/> : <AiFillEyeInvisible className='iconJustify'/> } 
                        </div>
                      </div>
                      {messageContraseña && messageContraseña.length > 0 && (
                        <div className='Mensaje__Error'>
                          <div className='MensajeError__Input' style={{position:"absolute"}}>{messageContraseña}</div>
                          {/*<OutlinedAlerts ErrorMessage={ messageContraseña }/>*/}
                        </div>
                      )}

                    </div>

                    {error ? (<div className='alert-container'><TransitionAlerts ErrorMessage={error} Tipo={"error"}/></div>):(null) }
                    {alertExito ? (<div className='alert-container'><TransitionAlerts ErrorMessage={alertExito} Tipo={"exito"}/></div>):(null) }

                    {/* Boton */}
                    <div className='container-btn'>
                      <button
                        className={ isFormValid ? 'Login__btn__outline main-green' : 'Login__btn__outline-Inactive' }
                        type="submit"
                        onClick={(e) => { onGeneratorQR() }}
                        disabled={!isFormValid} // Habilita el botón solo si el formulario es válido
                      >
                        Generar QR
                      </button>
                    </div>



                </div>
                {/* img Qr */}
                <div>
                  <div className='us-wrap' >
                    {
                      dataQr == "" || error ? (
                        <>
                          <img
                          className='us-img'
                          alt='Qr'
                          src={ imgQr }
                          />
                        </>
                        
                      ):(
                        <>
                          <img
                            className='us-img'
                            alt='Qr'
                            src={dataQr}
                            />
                            <div className='btn-outline-descarga main-green' onClick={handleDownloadImage}>
                              Descarga el QR
                            </div>
                        </>
                      )
                    }

                  </div>
                </div>

            </div>

            

          </div>
        </>
      )}
    </>
  )
}

export default FormQr;

