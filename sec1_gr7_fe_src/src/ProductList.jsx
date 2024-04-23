import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import yyy from './asset/img/bandner.png';



const ProductList = () => {
  const history = useHistory();
  const [Product, setProduct] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  
  React.useEffect(()=>{
    fetch('/getproduct')
      .then((res)=> res.json())
      .then((data)=>{
      if (Array.isArray(data)) {
        setProduct(data); 
        console.log("match");
      } else {
        console.error("Data received from server is not an array:", data);
      }})
      .catch((err) => console.log(err));
    
      fetch('/recommendproduct')
      .then((res)=> res.json())
      .then((data)=>{
      if (Array.isArray(data)) {
        setRecommendedProducts(data)
        console.log("match");
      } else {
        console.error("Data received from server is not an array:", data);
      }})
      .catch((err) => console.log(err));
    
  },[]);
  const handleViewDetails = (productID) => {
    console.log(productID)
    history.push({pathname:`/ProductDetail/${productID}`, state: productID });
    
  };
 

  return (
    <div className="bg-slate-50 bg-cover bg-center min-h-screen font-roboto">
      <div className="flex justify-center bg-[#880501] w-full py-4 gap-16">
        <h1 className="text-3xl text-white">Latest Release</h1>
        <h1 className="text-3xl text-white">Man</h1>
        <h1 className="text-3xl text-white">Woman</h1>
        <h1 className="text-3xl text-white">Kid</h1>

      </div>
      
      <div className="container max-w-6xl mx-auto"><img src={yyy} className='w-full h-1/4 items-center'/>
        <div className="text-4xl font-bold mb-8 text-start">
          <br />
          Recommended For You
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="grid grid-cols-3 gap-12">
            {recommendedProducts.map((product) => (
              <button key={product.PID} onClick={() => handleViewDetails(product.PID)}>
                <div className="bg-white max-w-m h-full rounded-lg overflow-hidden shadow-md">
                  <img className="w-auto h-auto object-cover object-center" src={product.Pic} alt="shoe" />
                  <div className="p-4 text-left">
                    <h5 className="text-xl font-semibold mb-2">{product.P_name}</h5>
                    <p className="text-lg text-gray-700 mb-2">Category: {product.Category}</p>
                    <p className="text-lg text-gray-700 mb-2">Size: {product.Size}</p>
                    <p className="text-lg text-gray-700 mb-4">Price: ${product.Price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-4xl font-bold mb-8 text-start">
          <br />
          Product
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          
        <div className="grid grid-cols-3 gap-12">
          {Product.map((product) => (
            <button key={product.PID} onClick={() => handleViewDetails(product.PID)}>
              <div className="bg-white max-w-m h-full rounded-lg overflow-hidden shadow-md">
                <img className="w-auto h-auto object-cover object-center" src={product.Pic} alt="shoe" />
                <div className="p-4 text-left">
                  <h5 className="text-xl font-semibold mb-2">{product.P_name}</h5>
                  <p className="text-lg text-gray-700 mb-2">Category: {product.Category}</p>
                  <p className="text-lg text-gray-700 mb-2">Size: {product.Size}</p>
                  <p className="text-lg text-gray-700 mb-4">Price: ${product.Price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductList;
