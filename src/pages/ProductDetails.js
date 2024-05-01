import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Grid, Container } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import {getProductDetails} from '../services/Product';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReactImageGallery from "react-image-gallery";
import '../styles/style.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import DashboardLayout from '../layouts/DashboardLayout';



const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProductDetails] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [ratings, setRatings] = useState(0);

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/home");
    }

    const getProductDeta = async (id) => {
        const response = await getProductDetails(id);
        setProductDetails(response.data);
        setRatings(response.data.rating);
        let images = [];
        response.data.images.forEach(image => {
            images.push({
                original: image,
                thumbnail: image
            })
        });
        console.log(product.images);
        setProductImages(images);
    };

    useEffect(() => {
        getProductDeta(id);
    }, []);

    return (
        <DashboardLayout children={
            <Container maxWidth="xl" className='mt-4'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={handleClick} style={{cursor: 'pointer'}}>
                            Home
                        </Link>
                        <Typography color="text.primary">{product.title}</Typography>
                    </Breadcrumbs>
                </div>
                <Card className='mt-3'>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sm={6}>
                            <ReactImageGallery
                                showBullets={false}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                items={productImages}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6}>
                            <h2>{product.title}</h2>
                            <strong className='text-primary'>Brand: {product.brand}</strong>
                            <hr />
                            <h3 className="mr-2 strike-through">
                                ${Math.floor((product.price - ((product.price * product.discountPercentage) / 100)))}
                            </h3>
                            <Typography fontSize="sm" fontWeight="lg">
                                M.R.P.: <del>${product.price}</del> 
                            </Typography>
                            <Typography fontSize="sm" color="danger" fontWeight="lg">({product.discountPercentage}%)</Typography>
                            <hr />
                            <h4>Description</h4>
                            <p>{product.description}</p>
                            <hr />
                            <h4>Category</h4>
                            <p>{product.category}</p>
                            <hr />
                            <h4>Ratings</h4>
                            <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
          
        >
          <Rating name="read-only" value={ratings} readOnly/>
        </Box>
                        </Grid>
                    </Grid>
                    </CardContent>
                </Card>
            </Container>} />
    );
};

export default ProductDetails;