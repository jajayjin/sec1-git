import React , { useState,useEffect } from 'react';
import './productManage.css'
import { useHistory } from 'react-router-dom';
import ModifyIcon from './asset/img/modify_icon_Ngb.png';
import RemoveIcon from './asset/img/remove_icon-Nbg.png';


const ProductManage = (props) => {

  const history = useHistory();
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [authen,setauthen] = useState({})
  const [valueDel,setValueDel] = useState({
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

  const adminID = localStorage.getItem('AID');
  const adminUser = localStorage.getItem('username')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/check_authen', {
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

        if (!data) {
          history.push('/login');
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    const username = localStorage.getItem('username');
    const AIDManage = localStorage.getItem('AID');

    if (username) {
      setauthen(prevAuthen => ({
        ...prevAuthen,
        Modifyuser: username,
        AIDManage: AIDManage,
        quote: "Delete Product"
      }));
    

    }

    fetch('/ProductManage')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setValue(data);
        } else {
          console.error("Data received from server is not an array:", data);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const handlepush = ()  => {
    history.push('/ProductSearchAdmin'); 
  };

  const handleChange2 = (id) => {
    console.log(id)
    setValueDel(id)
    setauthen(prevAuthen => ({
      ...prevAuthen,
     productid: id
    }))
  };

  const handleDelete = (event) => {
   
 
    fetch(`/deleteProduct/${valueDel}?adminID=${adminID}&username=${adminUser}`, {
      method: 'DELETE'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to delete data');
          }
          
      })
      .then(data => {
        console.log("datasent")
          console.log(valueDel); 
      })
      .catch(error => {
          console.error('Error:', error); 
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
        
          if (response.status !== 200) {
            console.log("bad");
            throw new Error(response.statusText);
          }
          // history.push('/usermanage');
          return response.json();
        })
        .catch((err) => {
          console.log(err.toString());
          console.log('error');
        });
    }

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(`/searchproduct?query=${search}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setValue(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handlemodify  = (ProductId) =>{
    history.push({pathname:`/ModifyProduct/${ProductId}`,  state: ProductId});
  };


  return (
    <div class="p-8 sm:ml-64 overflow-x-auto shadow-md">

      <div>
        <h1 class='text-xl mb-5'>Product</h1>
      </div>
      
      <div className='searchBar'>
        <input id="searchName" 
          type="text" 
          name='P_name'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Enter product name"
          className="mr-5"
        />
        <button type='submit'className="mr-5" onClick={handleSearchSubmit}>Search</button>
        <button type='submit'className="mr-5" onClick={handlepush}>Advanced Search</button><br/>
      </div>

      <div className='Tablebox'>
        <table>
          <thead>
            <tr>
              <th className='Pn'>Product</th>
              <th className='Sz'>Size</th>
              <th className='Cat'>Category</th>
              <th className='Inst'>In Stock</th>
              <th className='Id'>ID</th>
              <th className='Modi'></th>
              <th className='Del'></th>
            </tr>
          </thead>
          <tbody>
            {value && value.map((product) => (
              <tr key={product.PID}>
                <td>{product.P_name}</td>
                <td>{product.Size}</td>
                <td>{product.Category}</td>
                <td>{product.quantity}</td>
                <td>{product.PID}</td>
                <td>
                  <a>
                    <button  onClick={() => handlemodify(product.PID)}>
                      <img src={ModifyIcon} alt='Modify icon' className='w-8 h-auto'/>
                    </button>
                  </a>
                </td>
                <td>
                  <form onSubmit={handleDelete}>
                    <button onClick={() => handleChange2(product.PID)}>
                      <img src={RemoveIcon} alt='Remove icon' className='w-7 h-auto'/>
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='AddButton'>
        <a href='/AddProduct'>
          <button type='submit'>Add</button>
        </a>
      </div>   
    </div>

  )
};

export default ProductManage;