import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const ProdCard = (props) => {
  const { productDetails } = props;
  const navigate = useNavigate();

  const onHandleClick = (id) => {
    navigate("/product-details/"+id);
  }

  return (
    <Card style={{cursor: 'pointer'}} onClick={() => { onHandleClick(productDetails.id) }}>
      <div>
        <Typography level="title-lg" height={50}>{productDetails.title}</Typography>
        <Typography level="body-sm"><strong>{productDetails.brand}</strong> | <strong>{productDetails.category}</strong></Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img className="object-fit-contain"
          src={productDetails.thumbnail}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal" style={{justifyContent: 'space-between'}}>
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg" className="mr-2 strike-through">
            ${Math.floor((productDetails.price - ((productDetails.price * productDetails.discountPercentage) / 100)))}
          </Typography>
          <Typography fontSize="sm" fontWeight="lg">
            M.R.P.: <del>${productDetails.price}</del> <Typography fontSize="sm" color="danger" fontWeight="lg">({productDetails.discountPercentage}%)</Typography>
          </Typography>
        </div>
        <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
          
        >
          <Rating name="read-only" value={productDetails.rating} readOnly/>
        </Box>
      </CardContent>
    </Card>
  );

}

export default ProdCard;
