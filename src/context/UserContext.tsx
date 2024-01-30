import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import { Usuario, UsuarioResponse } from '../components/interfaces/appInterfaces';



import { AuthContext } from './AuthContext';
import { authReducer, AuthState } from './authReducer';

import CasagriApi from '../api/CasagriApi';
import { useDispatch } from 'react-redux';



type UserUpdateContextProps = {
    usuario: Usuario | null;
    //updateUser: ( UserId: string, Name: string) => Promise<void>;
    updateUserName: ( UserId: string, Nombre: string) => Promise<void>;
    updateUserNameReal: ( UserId: string, Nombre: string) => Promise<void>;
    updateUserDescription: ( UserId: string, Description: string) => Promise<void>;
    updateUserApellido: ( UserId: string, Apellido: string) => Promise<void>;
    loadUserById: ( id: string ) => Promise<Usuario>;
    uploadImage: ( data: any, id: string ) => Promise<void>; // TODO: cambiar ANY
    updateUserImgProfile: ( UserId: string, Img: string) => Promise<void>;
}



export const UserUpdateContext = createContext({} as UserUpdateContextProps);





export const UserProvider = ({ children }: any ) => {



    //const [usuario, setUser] = useState<Usuario>();
    const [usuario, setUser] = useState<Usuario | null>(null);

    const { user, signIn, status } = useContext( AuthContext );



    //Aquí mantenemos siempre el Usuario Aactualizado
    useEffect(() => {
        updateUsuario();
    }, [])


    // Función para obtener el token del almacenamiento local
    const getToken = () => {
        return localStorage.getItem('token');
    };


    

    //Actualizar el Usuario
    const updateUsuario = async() =>{

        //buscamos el token
        const token = getToken();
        
        // No token, no autenticado
        if (!token) {
            setUser(null); // Asignar null en lugar de undefined
            return;
          }

        const resp = await CasagriApi.get('/auth')
        setUser( usuario => {
            //console.log(usuario)
            return (usuario?.uid === user?.uid )
                    ? resp.data.usuario
                    : usuario;      
        });
    }


    // Actualizar Usuario Nombre
    const updateUserName = async( UserId: string, Nombre: string ) =>{
        const resp = await CasagriApi.put<Usuario>(`/usuarios/${ UserId }`, {
            uid:UserId,
            nombre: Nombre
        });
        setUser( usuario => {
            return (usuario?.uid === UserId )
                    ? resp.data
                    : usuario;
        });
        
    }


    // Actualizar Usuario Nombre Real
    const updateUserNameReal = async( UserId: string, Nombre: string ) =>{
        const resp = await CasagriApi.put<Usuario>(`/usuarios/${ UserId }`, {
            uid:UserId,
            nombreReal: Nombre
        });
        setUser( usuario => {
            return (usuario?.uid === UserId )
                    ? resp.data
                    : usuario;
        });
        
    }

    // Actualizar Usuario Apellido
    const updateUserApellido = async( UserId: string, Apellido: string ) =>{
        const resp = await CasagriApi.put<Usuario>(`/usuarios/${ UserId }`, {
            uid:UserId,
            apellido: Apellido
        });
        setUser( usuario => {
            return (usuario?.uid === UserId )
                    ? resp.data
                    : usuario;
        });
        
    }



     // Actualizar Usuario Descripcion
    const updateUserDescription = async( UserId: string, Description: string ) =>{
        const resp = await CasagriApi.put<Usuario>(`/usuarios/${ UserId }`, {
            uid:UserId,
            descripcion: Description
        });
        setUser( usuario => {
            return (usuario?.uid === UserId )
                    ? resp.data
                    : usuario;
        });
        
    }






    // cargar usuario por ID
    const loadUserById = async( id: string ):Promise<Usuario> => {
        const resp = await CasagriApi.get<Usuario>(`/usuarios/${ id }`);
        return resp.data;
    };



    const [selectedImage, setSelectedImage] = useState(null);

    //Función para manejar la selección de una imagen
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const uploadImage = async () => {
        if (!selectedImage) {
          console.error('No se ha seleccionado una imagen.');
          return;
        }
    
        const formData = new FormData();
        formData.append('archivo', selectedImage);
    
        try {
          const id = 'tu_id_aqui'; // Reemplaza con el ID adecuado
          const resp = await CasagriApi.put(`/uploads/usuarios/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(resp);
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
    };
    


    // Actualizar link de imagen deperfil
    const updateUserImgProfile = async( UserId: string, Img: string ) =>{
        const resp = await CasagriApi.put<Usuario>(`/usuarios/${ UserId }`, {
            uid:UserId,
            img: Img
        });
        setUser( usuario => {
            return (usuario?.uid === UserId )
                    ? resp.data
                    : usuario;
        });
        
    }



    return(
        <UserUpdateContext.Provider value={{
            usuario,
            updateUserName,
            updateUserNameReal,
            updateUserApellido,
            updateUserDescription,
            loadUserById,
            uploadImage,
            updateUserImgProfile,
        }}>
            { children }
        </UserUpdateContext.Provider>
    )
}