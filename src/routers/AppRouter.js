import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//  Common
import  Navbar  from '../components/common/Navbar/Navbar';

//Pages
import { Home }  from '../pages/Home'


export const AppRouter = () => {


    return (
        <Router>
            <div style={{  display:'block' }}>
            
                    <Navbar />        
                    <Routes>
                        <Route path="/" element={ <Home/> }></Route>;
                    </Routes>

            </div> 
        </Router>
    )
}
