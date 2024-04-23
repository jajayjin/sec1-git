import React, { useState, useEffect}from 'react';
import {useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    
    fetch(`/productdetail/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data.data))
      .catch(error => console.error('Error fetching product:', error));
  },);
   
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="bg-red-800 py-4">
        <div className="flex justify-center gap-3 text-white">
          <h1 className="text-3xl text-white">Latest Release</h1>
          <h1 className="text-3xl ml-6 text-white">Man</h1>
          <h1 className="text-3xl ml-6 text-white">Woman</h1>
          <h1 className="text-3xl ml-6 text-white">Kid</h1>
        </div>
      </div>

      <div className="m-12">
        <h1 className="text-5xl font-bold">{product.P_name}</h1>
        <h1 className="text-xl text-gray-600">Product ID: {product.PID}</h1>
      </div>

      <div className=''>
      <div className="flex m-12 items-center  max-w-fit overflow-hidden">
        <div>
          <img className="w-1/2 h-1/2 my-3 object-cover object-center" src={product.Pic} alt="shoe" />
        </div>

        <div className=" py-4 text-4xl">
          <h1 className="font-bold ">Product Details</h1>
          <h1 className=' text-2xl'>Release Date: {product.ReDate}</h1>
          <h1 className=' text-2xl'>Category: {product.Category}</h1>
          <h1 className=' text-2xl'>Price: ${product.Price}</h1>
          <h1 className=' text-2xl'>Available in stock: {product.quantity}</h1>
        </div>
      </div>

      <div className='text-wrap w-1/2 ml-12 mb-24'>
        <h1 className='font-bold text-2xl mb-4 '>Description</h1>
        <p>{product.Description}</p>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;
