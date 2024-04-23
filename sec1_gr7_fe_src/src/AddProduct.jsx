import React , { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

    const collection = ['None', 'Men', 'Women', 'Kids'];
    const colorOptions = ['None','Red','Green','Blue']

const AddProduct = () => {

    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({
        P_name: '',
        Description: '',
        quantity:'',
        Price: '',
        pic:'',
        Size: '',
        ReDate:'',
        Category:'',
        color:'',
    });
    const [authen,setauthen] = useState({});
    const adminID = localStorage.getItem('AID');
    const adminUser = localStorage.getItem('username')

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/check_authen`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
          });
    
          if (!response.ok) {   
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
    
          if (data !== false) {
            console.log(data);
          } else {
            window.location.href = '/login';
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchData();
    
      const username = localStorage.getItem('username');
      const AIDManage = localStorage.getItem('AID');
    
      if (username) {
        setauthen(prevInfo => ({
          ...prevInfo,
          Modifyuser: username,
          AIDManage: AIDManage,
          quote: "Add Product"
          
        }));
      }
    }, []);
    

  const handleInsery = (newData) => {
    let name = newData.target.name;
    setProduct({...product,[name]: newData.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start submit");
    console.log(product);
    fetch(`/AddProduct/?adminID=${adminID}&username=${adminUser}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        console.log(response)
        if (response.status !== 200) {
          console.log("bad");
          throw new Error(response.statusText);
        }
        setShowModal(true);
        history.push('/productmanage');
        return response.json();
      })
      .then(() => {
        
        console.log('success');
      })
      .catch((err) => {
        console.log(err.toString());
        console.log('error front');
      });
      fetch('/insertmodifyproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authen),
      })
        .then((response) => {
          console.log(response)
          if (response.status !== 200) {
            console.log("bad");
            throw new Error(response.statusText);
          }
          history.push('/usermanage');
          return response.json();
        })
        .catch((err) => {
          console.log(err.toString());
          console.log('error');
        });
  };
    return(
        <div>
            <div className="p-4 sm:ml-64 shadow-md ">
              <div className="px-8">
                <h1 class='text-3xl pt-12 '>Add Product</h1>
              </div>
            </div>

            <form className='p-72 sm:ml-64 pt-12 items-center' onSubmit={handleSubmit}>

                <label id='ProName' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Product name</label>
                <input type="text" onChange={handleInsery} name='P_name' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>  

                <label id='quantity' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Quantity</label>
                <input type="number" onChange={handleInsery} name='quantity' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>

                <label id='Size' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Size</label>
                <input type="text" onChange={handleInsery} name='Size' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>

                <label id='price' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Price</label>
                <input type="text" onChange={handleInsery} name='Price' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>

                <label id='coll' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Catagory</label>
                <select
                  name='Category'
                  onChange={handleInsery}
                  class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500' required
                >
                    {collection.map((ColOption) => (
                        <option key={ColOption} value={ColOption}>
                            {ColOption}
                        </option>
                    ))}
                </select>

                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Color</label>
                <label>
                    <select
                      name="color"
                      value={product.productColor}
                      onChange={handleInsery}
                      class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500' required>
                        {colorOptions.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </label> 

                <label id='Release Date' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Release Date</label>
                <input type="date" onChange={handleInsery} name='ReDate' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>  

                <p id='Des' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Description</p>
                <input type="text" onChange={handleInsery} name='Description' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>

                <p id='PicUrl' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Picture Url</p>
                <input type="text" onChange={handleInsery} name='Pic' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>

                <button className="bg-slate-950 ml-5 hover:bg-red-700 text-white py-2 px-4 rounded mt-5" onClick={() => history.push('/productmanage')}>
                  Back
                </button>

                <button type='submit' value="Submit"  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-5" >
                  Confirm
                </button>

                
            
            </form>
        </div>
    )

}

export default AddProduct;