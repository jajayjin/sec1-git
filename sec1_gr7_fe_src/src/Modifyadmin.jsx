
import React, { useEffect, useState } from 'react';
import { useLocation,useHistory  } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Modifyuser = () => {
  const location = useLocation();
  const userId = location.state;
  const history = useHistory();
  const [authen,setauthen] = useState({})
  const [info, setInfo] = useState({
    
    Password:'',
    Username:'',
    Afname: '',
    Alname: '',
    PhoneNo: '',
    Aemail:'',
    Modifyadd:''
    , AIDmanage:''
  });

  console.log(info)
  const [storedUsername, setStoredUsername] = useState('');
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

          if (data != false) {
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
    const AIDManage=localStorage.getItem('AID');
    if (username) {
      setStoredUsername(username);
      
      setauthen(prevInfo => ({
        ...prevInfo,
        Modifyuser: username
      }));
      setauthen(prevInfo => ({
        ...prevInfo,
        AIDManage: AIDManage
      }));
      setauthen(prevInfo => ({
        ...prevInfo,
        quote: "Modify user"
      }));
    }
  }, []);

  const handleChange = (newData) => {
    let name = newData.target.name;

    setInfo({...info,[name]: newData.target.value})
    setInfo(prevInfo => ({
      ...prevInfo,
      AID: userId
    }));
    
  }
    const handleSubmit = async (e) => {
      console.log("start change")
      console.log(info)
      e.preventDefault();
      try {
        const response = await fetch(`/modifyuser/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        console.log('User updated successfully');
        setInfo({
          Password:'',
          Username:'',
          Afname: '',
          Alname: '',
          PhoneNo: '',
          Aemail:'',
        });
        
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error
      }
      fetch('/insertmodifyadmin', {
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
    
  return (
    <div>
    <div className="p-4 sm:ml-64 shadow-md ">
        <div className="px-8">
          <h1 className="text-3xl pt-12 ">Modify Admin</h1>
          </div>
    </div>
    <div className="p-72 sm:ml-64 pt-12 items-center"action="/form-useradd" method="GET"> 
   
        <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">First name</label>
        <form className="flex" onSubmit={handleSubmit}> <input type="text" name="Afname" id="first_name" onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"  required />
        <button  type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded pl-4">
          change
          </button>
        </form>
      
        <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Last name</label>
        <form className="flex" onSubmit={handleSubmit}> <input type="text" name="Alname" id="first_name"onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"  required />
        <button  type="submit" value="Submit" onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded pl-4">
          change
          </button>
        </form>
        <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Phone number</label>
        <form className="flex" onSubmit={handleSubmit}> <input type="text" name="PhoneNo" id="first_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"  required />
        <button  type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded pl-4">
          change
          </button>
        </form>
        <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</label>
        <form className="flex"onSubmit={handleSubmit}> <input type="text" name="Aemail" id="first_name"onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"  required />
        <button  type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded pl-4">
          change
          </button>
        </form>
         <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Username</label>
         <form className="flex" onSubmit={handleSubmit}> <input type="text" name="Username" id="first_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"  required />
        <button  type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded pl-4">
          change
          </button>
        </form>
        <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password</label>
        <form className="flex"onSubmit={handleSubmit}> <input type="text" name="Password" id="first_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"  required />
        <button  type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded pl-4">
          change
          </button>
        </form>
        <div className="flex justify-end mt-4   pb-8">
        <Link to="/usermanage"className="flex justify-end mt-4  pr-4 pb-8">
          <button className="bg-black hover:bg-brown text-white py-2 px-4 rounded">
            back
          </button>
        </Link>
        <Link to="/usermanage"className="flex justify-end mt-4  pr-4 pb-8">
        <button className="bg-red-500 hover:bg-red-700 text-white  px-4 rounded">
          confirm
          </button>
        </Link>
      </div>
      </div>
    </div>
  )
  };

export default Modifyuser;
