"use client";

import React from 'react';
import { Card } from "flowbite-react";
import Image from "next/image"; // Import necessary components
import { useState } from "react";

const ProductCard = ({ product, onRemoveYesClick }) => {
    const [isRemoveActive, setIsRemoveActive] = useState(false);

    const handleRemoveClick = () => {
        console.log("Remove clicked!")
        setIsRemoveActive(true);
      };

    const onRemoveNoClick = () => {
            console.log("Remove No clicked!")
            setIsRemoveActive(false);
          };

  return (
    <Card className="max-w-sm">
      <Image className="rounded-md" width={500} height={500} src={product.images[0].cdnUrl} alt="image 1" />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
      <p className="font-small text-gray-700 dark:text-gray-400">{product.description}</p>
      <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
      <div className="inline-flex">
        <button type="button" className="w-3/4 mx-1">
            <a
             href={product.url}
             target="_blank"
             className="block w-full py-2 rounded-lg bg-green-500 hover:bg-green-600  text-center text-sm font-medium text-white"
           >
             Buy
           </a>
        </button>
        <button className={`mx-1 w-1/4 py-2 rounded-lg bg-red-500 ${isRemoveActive ? 'bg-opacity-25' : 'hover:bg-red-600'} text-center text-sm font-medium text-white`}
                disabled={isRemoveActive}
                onClick={handleRemoveClick}>
          Remove
        </button>
      </div>
      {isRemoveActive &&
        <div className="text-center">
        <h1> Are you sure? </h1>
        <div className="inline-flex w-3/4">
          <button className="mx-1 w-1/2 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-center text-sm font-medium text-white"
                  onClick={() => onRemoveYesClick(product.productId)}>
            Yes
          </button>
          <button className={`mx-1 w-1/2 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-center text-sm font-medium text-white`}
                  onClick={onRemoveNoClick}>
            No
          </button>
        </div>
        </div>
      }
    </Card>
  );
};

export default ProductCard;