import React from 'react';
import '../../Styles/Footer.css'

const Footer = () => {
    return (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex justify-between">
            <div className="w-1/3">
                <p><span className='AR'>AR</span>Construcciones</p>
            </div>
            <div className="w-1/3 flex justify-center space-x-4">
                <a href="https://facebook.com" className='social-icon' target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" className='social-icon'rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" className='social-icon' rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            <div className="w-1/3 text-left">
                <p><i className="fas fa-phone-alt"></i> (123) 456-7890</p>
                <p><i className="fas fa-map-marker-alt"></i> 123 Main St, City, Country</p>
                <p><i className="fas fa-envelope"></i> info@example.com</p>
            </div>
        </div>
    </footer>
    );
};

export default Footer;