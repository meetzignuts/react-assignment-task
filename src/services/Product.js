import axios from 'axios';

export const getProductList = (skip, limit) => {
    return axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
}

export const getProductDetails = (id) => {
    return axios.get(`https://dummyjson.com/products/${id}`);
}
