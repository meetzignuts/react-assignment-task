import ProdCard from '../components/ProdCard';
import { Grid, Container } from '@mui/material';

import React, { useEffect, useState , useRef } from 'react';
import {getProductList} from '../services/Product';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductList = () => {

    const effectRan = useRef(false);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const getProductdata = async (skip, limit) => {
        const response = await getProductList(skip,limit);
        setProducts(response.data.products);
        setTotalCount(response.data.total);
        console.log(response.data);
    };

    const onPageChange = (event, value) => {
        getProductdata((value-1)*8,8);
    };

    useEffect(() => {
            getProductdata(0,8);
    }, []);

    return (
        
        <Container maxWidth="xl" className='mt-4'>
                <Grid container spacing={2}>
                    {
                        products.map((product, key) => {
                            return (<Grid item xs={12} md={3} sm={6} key={key}>
                                <ProdCard productDetails={product} />
                            </Grid>);
                        })
                    }
                </Grid>
                <div className='d-flex justify-content-center mt-4'>
                    <Stack spacing={2} >
                        <Pagination count={Math.ceil(totalCount/8)} onChange={onPageChange} color="primary" justifycontent='center'/>
                    </Stack>
                </div>
            </Container>
    );
};

export default ProductList;