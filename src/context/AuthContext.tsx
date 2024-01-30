import React, { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { Usuario, LoginResponse, LoginData, RegisterData } from '../components/interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer.tsx';


type AuthContextProps = {
    errorMessage: string;
    loader: boolean;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
    //updateName: ( usuario: Usuario ) => void;
}


// Estado Inicial
const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    usuario: null,
    errorMessage: '',
    loader: false,
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    const navigate = useNavigate();

    useEffect(() => {
        checkToken();
    }, [])

    useEffect(() => {
      //console.log("aqui va el contexto")
      //console.log(state)
  }, [state])


    // Función para obtener el token del almacenamiento local
    const getToken = () => {
        return localStorage.getItem('token');
    };
    // Función para almacenar el token en el almacenamiento local
    const storeTokenInLocalStorage = (token:any) => {
        localStorage.setItem('token', token); 
    };
    // Función para eliminar el token del almacenamiento local
    const removeTokenFromLocalStorage = () => {
        localStorage.removeItem('token'); 
    };

    //validacion de Token
    const checkToken = async () => {
        try {
          const token = getToken();
      
          // No hay token, no autenticado
          if (!token) {
            dispatch({ type: 'notAuthenticated' });
            return;
          }
      
          // Realizar una solicitud para validar el token
          const response = await axios.get('https://casagriprueba.casagri-group.com/api/auth', {
            headers: {
              'x-token': token,
            },
          });
      
          if (response.status !== 200) {
            // Si la solicitud no es exitosa, el token no es válido
            dispatch({ type: 'notAuthenticated' });
            return;
          }
      
          // El token es válido, actualiza el token en el almacenamiento local si es necesario
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
      
          // Despacha la acción de inicio de sesión exitosa con el token y el usuario
          
          dispatch({
            type: 'signUp',
            payload: {
              token: response.data.token,
              user: response.data.usuario,
            },
          });

          navigate("/");



        } catch (error) {
          console.error('Error al validar el token:', error);
          dispatch({ type: 'notAuthenticated' });
        }
    };



    {/* Iniciar Sesión */}
    const signIn = async ({ correo, password }) => {

      // Actualiza solo el estado de "cargando", cuando se inicia sesión
      dispatch({
        type: 'addLoader',
        payload: true,
      });


        try {
          const response = await axios.post(`${process.env.REACT_APP_MY_ENV_VARIABLE__TWO}${"auth/login"}`, { correo, password });
          const data = response.data;
          console.log(data);
      
          // Actualiza el estado de autenticación con el token y el usuario
          dispatch({
            type: 'signUp',
            payload: {
              token: data.token,
              user: data.usuario,
            },
          });
      
          // Almacena el token en el almacenamiento local
          storeTokenInLocalStorage(data.token);
        } catch (error) {
          console.error(error);
      
          // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
          dispatch({
            type: 'addError',
            payload: error.response?.data?.msg || 'Revise la información',
          });
        }
      };

    

    {/* Registrar Usuario */}
    const signUp = async ({ nombre, correo, password }) => {
        try {
          const response = await axios.post('https://casagriprueba.casagri-group.com/api/usuarios', { correo, password, nombre });
          const data = response.data;
          console.log(data);
      
          // Actualiza el estado de autenticación con el token y el usuario
          dispatch({
            type: 'signUp',
            payload: {
              token: data.token,
              user: data.usuario,
            },
          });
      
          // Almacena el token en el almacenamiento local
          storeTokenInLocalStorage(data.token);
        } catch (error) {
          console.error(error);
      
          // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
          if (error instanceof Error) {
            dispatch({
              type: 'addError',
              payload: 'Revise la información',
            });
          } else {
            console.log('Error inesperado', error);
          }
        }
    };



    {/* Cerrar Sesión */}

    const logOut = async() => {
        // Elimina el token del almacenamiento local
        removeTokenFromLocalStorage();
        // Actualiza el estado de autenticación para marcar al usuario como desconectado
        dispatch({ type: 'logout' });
      };
      

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )

}


