"use server";

import axios from 'axios';

export async function createNewProduct(product) {
    try {
        const apiResponse = await axios.post('http://localhost:8080/v1/products/', {
          data: product
        });
        if (apiResponse.status === 200) {
            return {success: "Successfully created product!"}
        }

    } catch (e) {
        return {error: "Failed to create product."}
    }
}