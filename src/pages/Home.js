import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("userLoggedIn")) {
            navigate("/login");
        }
    }, []);

    return (
        <div className='w-100'>
            <Navbar />
            <ProductList/>
        </div>
    );
};

export default Home;