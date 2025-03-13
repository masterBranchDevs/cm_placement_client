import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/visitors/count');
                setVisitorCount(response.data.count);
            } catch (error) {
                console.error('Error fetching visitor count:', error);
            }
        };

        const incrementVisitorCount = async () => {
            try {
                await axios.post('http://localhost:5000/api/visitors/increment');
                fetchVisitorCount();
            } catch (error) {
                console.error('Error incrementing visitor count:', error);
            }
        };

        incrementVisitorCount();
    }, []);

    return (
        <div className="my-" style={{ backgroundColor: "#212b33" }}>
            <footer className="text-center text-lg-start border border-dark mt-xl-5 pt-4">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="text-uppercase mb-4 text-white">Contact Us</h5>
                            <table className="">
                                <tbody>
                                    <tr>
                                        <td><i className="fas fa-envelope me-3" style={{ color: "white" }}></i></td>
                                        <td><a href="mailto:cmcomputerclasses@gmail.com" className="text-white">cmcomputerclasses@gmail.com</a></td>
                                    </tr>
                                    <tr>
                                        <td><i className="fas fa-phone me-3" style={{ color: "white" }}></i></td>
                                        <td><a href="tel:+919825000000" className="text-white">+91 9825000000</a></td>
                                    </tr>
                                    <tr>
                                        <td><i className="fas fa-map-marker-alt me-3" style={{ color: "white" }}></i></td>
                                        <td className="text-white">Shop no 16, Ruchi shopping center, Kawas, Surat, Gujarat 394510</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fas fa-globe me-3" style={{ color: "white" }}></i></td>
                                        <td><a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-white">www.cmcomputerclasses.com</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="text-uppercase mb-4 text-white">Services</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!" className="text-white">Contact us</a></li>
                                <li><a href="#!" className="text-white">Size Guide</a></li>
                                <li><a href="#!" className="text-white">Shipping Information</a></li>
                                <li><a href="#!" className="text-white">Returns & Exchanges</a></li>
                                <li><a href="#!" className="text-white">Payment</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="text-uppercase mb-4 text-white">Careers</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!" className="text-white">Jobs</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="text-uppercase mb-4 text-white">Location</h5>
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.220272845673!2d72.71026060495811!3d21.183406878142776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be053f805641cbd%3A0x257df2f7760b6978!2sCm%20Computer%20And%20Spoken%20Classes!5e0!3m2!1sen!2sin!4v1739855854473!5m2!1sen!2sin"
                                width="100%"
                                height="200"
                                style={{
                                    borderRadius: "15px",
                                    boxShadow: "0 0 20px 0 rgb(165, 157, 157)",
                                    maxWidth: "500px",
                                    display: "block",
                                    margin: "0 auto"
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 border-top border-white text-white">
                    <div>
                        Number of visitors: {visitorCount}
                    </div>
                    <div>
                        © 2020 Copyright:
                        <a className="text-white" href="https://www.cmplacement.com"> CM Placement Services</a>
                    </div>
                    <div className='opacity-50'>
                        Developed by <a href='https://rakesh-shah.vercel.app/' target='_blank'>Rakesh Shah</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;