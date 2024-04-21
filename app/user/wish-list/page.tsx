"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Highlight from '@/components/Highlight';
import withClientPageAuth from '@/components/withClientPageAuth';
import { getUserWishList, removeProductFromWishList } from '@/actions/actions';
import { Card } from "flowbite-react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

const UserWishListPage = () => {
  const { user, isLoading } = useUser();
  const [products, setProducts] = useState({});

    useEffect(() => {
      const fetchProducts = async () => {
        if(!isLoading && user) {
            const response = await getUserWishList(user?.name);
            console.log(response?.products)
            setProducts(response?.products);
        }
      };

      fetchProducts();
    }, [user, isLoading]);

  const handleRemoveYesClick = (productId) => {
      console.log(productId)
      const updatedProducts = { ...products };
      delete updatedProducts[productId];
      setProducts(updatedProducts)
      removeProductFromWishList(user?.name, productId)
    };

  return (
    <>
      <div className="mb-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 place-items-center">
        {products && typeof products === 'object'
            && Object.entries(products).map(([productId, product]) => (
            <ProductCard
              key={productId}
              product={product}
              onRemoveYesClick={handleRemoveYesClick}
            />
          ))}
          </div>
      </div>
    </>
  );
};

export default withClientPageAuth(UserWishListPage, "/user/wish-list");


