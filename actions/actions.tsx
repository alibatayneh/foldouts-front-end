"use server";

import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
export async function createNewProduct(product) {
    try {
        const apiResponse = await axios.post(`${backendUrl}/v1/products/`, {
          data: product
        });
        if (apiResponse.status === 200) {
            return {success: "Successfully created product!"}
        }

    } catch (e) {
        return {error: "Failed to create product."}
    }
}

export async function getUserWishList(phoneNumber) {
    try {
        const apiResponse = await axios.get(`${backendUrl}/v1/customers/wish-list/${phoneNumber}`);
        if (apiResponse.status === 200) {
            return {products: apiResponse.data}
        }

    } catch (e) {
        return {error: "Failed to create product."}
    }
}

export async function removeProductFromWishList(phoneNumber, productId) {
    try {
        const apiResponse = await axios.put(`${backendUrl}/v1/customers/wish-list/${phoneNumber}`, {
            productId: productId
        });
        if (apiResponse.status === 200) {
            console.log("Success remove")
            return {products: apiResponse.data}
        }

    } catch (e) {
        return {error: "Failed to create product."}
    }
}