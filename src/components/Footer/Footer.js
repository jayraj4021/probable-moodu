import React from 'react';
import './Footer.css';

const Footer = () => {

    let todayDate = new Date();
    let year = todayDate.getFullYear();

    return (
        <div style={{width:'100%'}} className='footerBar'>
            © {year} Moodu
        </div>
    )
}

export default Footer
