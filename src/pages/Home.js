import React from 'react';
import ProductList from '../components/ProductList';
import DashboardLayout from '../layouts/DashboardLayout';

const Home = () => {
    return (
        <DashboardLayout children={<ProductList/>} />
    );
};

export default Home;