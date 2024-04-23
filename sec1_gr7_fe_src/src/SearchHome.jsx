import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const catagory = ['All', 'Man', 'Woman', 'Kid'];
const defaultOption = catagory[0];

const size = ['All', '4', '4.5', '5', '5.5', '6'];
const defaultsize2 = size[0];

const SearchHome = () => {
  const history = useHistory();
  const [searchName, setSearchName] = useState('');
  const [searchcolor, setcolor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(defaultOption);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedSize, setSelectedSize] = useState(defaultsize2);
  const [searchResults, setSearchResults] = useState('');

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleColorChange = (event) => {
    setcolor(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === 'All' ? '' : selectedValue);
    console.log(selectedCategory)
  };

  const handleAvailableChange = (event) => {
    setIsAvailable(event.target.checked);
  };

  const handleClear = () => {
    setSearchName('');
    setcolor('');
    setSelectedCategory(defaultOption);
    setIsAvailable(true);
    setSelectedSize(defaultsize2);
    setSearchResults('');
  };

  const handleSizeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSize(selectedValue === 'All' ? '' : selectedValue);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const searchData = {
      searchName,
      searchcolor,
      category: selectedCategory,
      isAvailable,
      size: selectedSize,
    };

    try {
      const response = await fetch('/searchHome', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const searchResults = await response.json();
      console.log('Search Results:', searchResults);
      setSearchResults(searchResults);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleViewDetails = (productID) => {
    console.log(productID)
    history.push({pathname:`/ProductDetail/${productID}`, state: productID });
    
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <div className='my-12 mx-36'>
            <div className="flex flex-col w-full h-1/2 items-center justify-between ">
              <div className="bg-[#880501] text-white w-full py-4 text-center ">
                <h1 className='text-3xl text-white'>Search</h1>
              </div>

              {/* Name */}
              <div className='text-lg section flex flex-row w-full gap-4 h-1/2 justify-between my-4'>
                <label className='text-black text-xl text-left ml-12' htmlFor="searchName">
                  Name:
                </label>
                <input
                  className='justify-items-end ml-4'
                  id="searchName"
                  name="searchName"
                  type="text"
                  value={searchName}
                  onChange={handleNameChange}
                  placeholder="| Enter product name"
                />
              </div>

              {/* color */}
              <div className='text-lg section flex flex-row w-full gap-4 h-1/2 justify-between my-4'>
                <label className='text-black text-xl text-left ml-12' htmlFor="searchName">
                  Color:
                </label>
                <input
                  className='justify-items-end ml-4'
                  id="searchcolor"
                  name="searchcolor"
                  type="text"
                  value={searchcolor}
                  onChange={handleColorChange}
                  placeholder="| Enter product's color"
                />
              </div>

              {/* category choices */}
              <div className='text-lg section flex flex-row w-full gap-4 h-1/2 justify-between my-4'>
                <label className='ml-12' htmlFor="category">
                  Category:
                </label>
                <select
                  className='w-1/4'
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {catagory.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className='text-lg section flex flex-row w-full gap-4 h-1/2 justify-between my-4'>
                <label className='ml-12' htmlFor="size">
                  Size:
                </label>
                <select
                  className='w-1/4'
                  id="size"
                  name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  {size.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Available */}
              <div className='text-lg section flex flex-row w-full gap-4 h-full justify-between my-4'>
                <label className='ml-12' htmlFor="searchAvailable">
                  Available:
                </label>
                <div className="flex mr-28">
                  <input
                    className='mr-2 size-5'
                    type="checkbox"
                    id="searchAvailable"
                    name='isAvailable'
                    checked={isAvailable}
                    onChange={handleAvailableChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-5">
              <button
                className="bg-[#880501] text-white items-center text-center px-5 py-2 rounded-md hover:scale-105 transition-transform "
                type="submit"
              >Search</button>

              <button
                className="bg-gray-800 text-white items-center text-center px-5 py-2 rounded-md hover:scale-105 transition-transform"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
        
      </div>


      <div className="container mx-auto py-8">
        {searchResults.length === 0 ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Browse 0 result</h1>
            <p className="text-xl text-gray-600">No products found matching your search criteria.</p>
          </div>
        ) : (
          <>
            <div className="text-left text-gray-800 my-12">
              <h1 className="text-3xl font-bold mb-4">Browse {searchResults.length} results</h1>
            </div>

            <div className="grid grid-cols-3 gap-12">
              {searchResults&&searchResults.map((product) => (
                
                <div key={product.P_name} className="bg-white max-w-m rounded-lg overflow-hidden shadow-md">
                  <img className="w-full h-1/2  object-cover object-center" src={product.Pic} alt="shoe" />
                  <div className="p-4">
                    <h5 className="text-xl font-semibold mb-2">{product.P_name}</h5>
                    <p className="text-lg text-gray-700 mb-2">Category: {product.Category}</p>
                    <p className="text-lg text-gray-700 mb-2">Size: {product.Size}</p>
                    <p className="text-lg text-gray-700 mb-4">Price: ${product.Price}</p>
                    <button className="bg-[#880501] text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition-colors"
                      onClick={() => handleViewDetails(product.PID)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>


    </div>
  );
};

export default SearchHome;
