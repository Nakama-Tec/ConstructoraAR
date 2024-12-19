import '../../Styles/Footer.css'

const Footer = () => {
    return (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex">
            <div className="columnas-footer">
                <p className='uppercase'>Constructora <span className='AR'>AR</span></p>                
            </div>
            
            <div className="columnas-footer flex justify-center space-x-4 ">
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
            <div className="columnas-footer text-left info-contenedor">
                <div className='informacion'>
                <i className="fas fa-phone-alt"></i>
                <p>(+54) 9 381 644-5024</p>
                </div>
                <div className='informacion'>
                 <i className="fas fa-envelope"></i>
                 <p>arconstrucciones.tuc@gmail.com</p>
                 </div>
                <div className='informacion'>
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Mendoza 1053, San Miguel de Tucumán, Argentina</p> 
                    </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.927633682673!2d-65.20961468495895!3d-26.83214098316156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c5f1c2c5b2b%3A0x7e0e0e0e0e0e0e0e!2sMendoza%201053%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n%2C%20Argentina!5e0!3m2!1sen!2s!4v1633024800000!5m2!1sen!2s"             
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
        <div className="container mx-auto text-center mt-4">
            <p>&copy; CONSTRUCTORA AR 2024</p>
        </div>

    

    </footer>
    );
};

export default Footer;
