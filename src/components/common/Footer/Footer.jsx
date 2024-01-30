import React from 'react';

//Logo casagri
import LogoCasagri from "../../../static/casagri-logo-footer.png";

//icons
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
//social Icons  
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";


//estilos
import './Footer.css'


const Footer = () => {
    return (
        <footer className="color__footer">
            {/* Contenedor Principal */}
            <div className="footer__container">

                {/* Logo */}
                <div className="footer__Logo" >
                        <a href='/'>
                            <div className='footer__logo__img' >
                                <img src={ LogoCasagri } alt="Casagri" />
                            </div> 
                        </a> 

                        {/*Social icons */}
                        <div className='footer__logo__IconsSocial'>
                            <a href='/' target='_blank' aria-label='Facebook'>
                                    <FaFacebookF className='footer__logo__IconsSocial__item'/>
                            </a>
                            <a href='https://instagram.com/casagri.ve?igshid=NmQ2ZmYxZjA=' target='_blank' aria-label='Instagram'>
                                    <BsInstagram className='footer__logo__IconsSocial__item'/>
                            </a>
                            <a href='/' target='_blank' aria-label='Youtube'>
                                    <BsYoutube className='footer__logo__IconsSocial__item'/>
                            </a>
                            <a href='/' target='_blank' aria-label='Twitter'>
                                    <BsTwitter className='footer__logo__IconsSocial__item'/>
                            </a>
                            <a href='/' target='_blank' aria-label='LinkedIn'>
                                    <BsLinkedin className='footer__logo__IconsSocial__item'/>
                            </a>
                        </div>
                </div>

                {/* Footer */}
                <div className="footer__info">

                    {/* Categorias */}
                    <div className="footer__info__products"> 
                        <ul className="footer__info__products__list" >
                            <li className='footer__info__products__item'>
                                <a href='/Category/Agroindustrial'>
                                    <span className='footer__span'>Agroindustrial</span>
                                </a> 
                            </li>
                            <li className='footer__info__products__item'>
                                <a href='/Category/Maquinarias'>    
                                    <span className='footer__span' >Maquinaria</span>
                                </a> 
                            </li>
                            <li className='footer__info__products__item'>
                                <a href='/Category/Salud Animal'>    
                                    <span className='footer__span' >Salud Animal</span>
                                </a> 
                            </li>
                            <li className='footer__info__products__item'>
                                <a href='/Category/Ferretería'>
                                    <span className='footer__span'>Ferretería</span>
                                </a> 
                            </li>
                            <li className='footer__info__products__item'>
                                <a href='/Category/Salud Pública'>
                                    <span className='footer__span' >Salud Pública</span> 
                                </a> 
                            </li>
                        </ul>
                    </div>

                    {/* Información de Contacto */}
                    <div className="footer__info__contact"> 
                        <div className='footer__info__contact__list'>
                            <div className='footer__info__contact__item'>
                                <div className='footer__info__contact__iconText'>
                                    <AiFillPhone className='footer__icon__contact'/>
                                    <span className='footer__contact__span' >0501- CASAGRI (2272474) 54654</span>
                                </div>
                                <div className='footer__info__contact__iconTextbtn'>
                                    <MdEmail className='footer__icon__contact'/>
                                    <span className='footer__contact__span'>mercadeo@casagri-group.com</span>
                                </div>
                            </div> 
                        </div>
                        <div className='footer__info__contact__list'>
                            <div className='footer__info__contact__item'>
                                <div className='footer__info__contact__iconText'>
                                    <MdLocationOn className='footer__icon__contact'/>
                                    <span className='footer__contact__span'>Barquisimeto, Venezuela. Av. Libertador entre calles 17 y 18 Zona Industrial I</span>
                                </div>
                            </div>
                        </div>
                        <div className='footer__info__contact__listbtn'>
                            <div className='footer__info__contact__item'>
                                <a href='/contact' className=''>
                                    <button className='footer__btn__outline main-green'>
                                        Contactar
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Casagri */}
            <div className="text-center text-Copy">Casagri © 2023 - All Rights Reserved</div>
            
        </footer>
    )
}

export default Footer; 