"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState('false');



    return (
        <h1 className="text-5xl"> Hello</h1>
    )

}