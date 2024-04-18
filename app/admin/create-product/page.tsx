"use client";

require('dotenv').config({ path: '@/.env.local' });
import { useFormState, useFormStatus } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { PACKAGE_VERSION } from '@uploadcare/blocks';
import { getSession } from '@auth0/nextjs-auth0';
import withClientPageAuth from '@/components/withClientPageAuth';
import CreateProduct from '@/components/CreateProduct';
import { useUser } from '@auth0/nextjs-auth0/client';
import Loading from '@/components/Loading';
import { Card, TextInput, Textarea } from "flowbite-react";
import * as LR from "@uploadcare/blocks";
import { createNewProduct } from '@/actions/actions';
import { useRouter, usePathname } from 'next/navigation';
LR.registerBlocks(LR);


function CreateProductPage() {
    const initialActionState = {
        message: null
    }
    const { pending } = useFormStatus();
    const { user, isLoading } = useUser();
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(null);
    const [btnIsLoading, setBtnIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const ctxProviderRef = useRef(null);
    const router = useRouter();

    const handleSubmit = async (prevState, formData) => {
    		if (files.length === 0) {
                setErrorMsg("At least one image is required for a product, please fix then re-submit...")
            } else {
                setErrorMsg(null);
                const productData = {
                    name: formData.get("input-name"),
                    price: formData.get("input-price"),
                    description: formData.get("input-description"),
                    url: formData.get("input-url"),
                    brand: formData.get("input-brand"),
                    images: files.map(({ uuid, cdnUrl }) => ({ uuid, cdnUrl }))
                }
                const response = await createNewProduct(productData)
                if (response.error) {
                    setErrorMsg(response.error)
                }
                if (response.success) {
                    setSuccessMsg(response.success)
                    alert('Product successfully created!');
                    window.location.reload();
                }
            }
    	}

    const [formState, formAction] = useFormState(handleSubmit, initialActionState);

    useEffect(() => {
      const handleDoneEvent = (event) => {
        const newUploadedFiles = [...event.detail.allEntries.filter((file) => file.status === 'success')];
        setFiles((prev) => [...prev, ...newUploadedFiles]);
        ctxProviderRef.current?.uploadCollection.clearAll();
      };

      // Add the event listeners
      ctxProviderRef.current?.addEventListener('done-click', handleDoneEvent);

      // Clean up by removing both event listeners when the component unmounts
      return () => {
        ctxProviderRef.current?.removeEventListener('done-click', handleDoneEvent);
      };
    }, []);

  return (
    <>
      {isLoading && <Loading />}
      {user && (
      <div className="flex mb-5 justify-center">
        {(user.user_roles as string[]).includes("ADMIN") ? (
        <Card className="w-full mx-2 md:w-3/5">
              <section className="h-full w-full">
                  <form action={formAction}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
                          Create Product
                  </h5>
                  <hr
                    className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                  />
                  <div className="inline-flex mb-5">
                    <h3 className="flex-col text-xl tracking-tight text-gray-900 dark:text-white mr-5">
                        Product Images:
                    </h3>
                    <lr-config
                      ctx-name="my-uploader"
                      pubkey={process.env.UPLOADCARE_PUBKEY}
                      maxLocalFileSizeBytes={10000000}
                      multipleMax={0}
                      imgOnly={true}
                      sourceList="local, url, camera"
                      confirm-upload={true}
                    />
                    <lr-file-uploader-regular
                      ctx-name="my-uploader"
                      css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.36.0/web/lr-file-uploader-regular.min.css`}
                    />
                    <lr-upload-ctx-provider
                      ctx-name="my-uploader"
                      ref={ctxProviderRef}
                    />
                </div>

                <div className={`grid grid-cols-2  gap-4 ${files.length === 0 ? '' : 'border-dashed border-2 border-slate-500 rounded-md'}`}>
                    {files.map((file) => (
                    <div key={file.uuid} className="border-solid border-2 border-black border-opacity-25 rounded-lg m-2 drop-shadow-2xl">
                        <img
                            className="h-auto max-w-full rounded-lg"
                            src={file.cdnUrl}
                            alt={file.fileInfo.originalFilename}
                        />
                    </div>
                    ))}
                </div>

                  <hr
                    className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                  />
                  <h3 className="flex-col text-xl tracking-tight text-gray-900 dark:text-white mb-2">
                      Product Name:
                  </h3>
                  <TextInput
//                     onChange={(event) => setName(event.target.value)}
//                     value={name}
//                     disabled={pending}
                    name="input-name"
                    id="input-name" placeholder="Product name to be displayed..." required color="black" />

                  <hr
                    className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                  />
                  <h3 className="flex-col text-xl tracking-tight text-gray-900 dark:text-white mb-2">
                      Product Price:
                  </h3>
                  <TextInput
//                     onChange={(event) => setPrice(event.target.value)}
//                     value={price}
                    disabled={pending}
                    type="number"
                    inputMode="numeric"
                    addon="$"
                    step=".01"
                    name="input-price"
                    id="input-price" placeholder="Product price in USD..." required color="black" />

                  <hr
                      className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                  />
                  <h3 className="flex-col text-xl tracking-tight text-gray-900 dark:text-white mb-2">
                      Product Description:
                  </h3>
                  <Textarea
//                     onChange={(event) => setDescription(event.target.value)}
//                     value={description}
                    disabled={pending}
                    name="input-description"
                    id="input-description" placeholder="Product description..." required rows={4} />

                  <hr
                    className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                  />
                  <h3 className="flex-col text-xl tracking-tight text-gray-900 dark:text-white mb-2">
                    Product Url:
                  </h3>
                  <TextInput
//                     onChange={(event) => setUrl(event.target.value)}
//                     value={url}
                    disabled={pending}
                    name="input-url"
                    id="input-url" placeholder="https://your-store.come/your-product" required color="black" />

                  <hr
                    className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                  />
                  <h3 className="flex-col text-xl tracking-tight text-gray-900 dark:text-white mb-2">
                    Product Brand:
                  </h3>
                  <TextInput
//                     onChange={(event) => setBrand(event.target.value)}
//                     value={brand}
                    disabled={pending}
                    name="input-brand"
                    id="input-brand" placeholder="Brand associated with product.." required color="black" />

                    {!(errorMsg === null) &&
                        <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span className="font-medium">Error!</span> {errorMsg}
                        </div>
                    }
                    {!(successMsg === null) &&
                        <div className="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                          <span className="font-medium">Success!</span> {successMsg}
                        </div>
                    }

                    <div className="mt-5">
                       <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 border border-blue-700 rounded shadow mr-3"
                            disabled={pending}
                            type="submit">
                         {pending && <span>Loading...</span>}
                         {!pending && <span>Submit</span>}
                       </button>
                       <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        disabled={pending}
                        type="button">
                         Cancel
                       </button>
                   </div>
                   </form>
            </section>
        </Card>

        ) : (
          // If user doesn't have ADMIN role, render a "Not Authorized" message
          <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">You are not authorized to view this page!</span>
          </div>
        )}
      </div>
      )}
    </>
  );
};

export default withClientPageAuth(CreateProductPage, "/admin/create-products");


