
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Adduser = () => {
  const history = useHistory(); 
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email:'',
    username:'', 
    pass:'' , 
     });
  const [authen, setauthen] = useState({})
  const handleChange = (newData) => {
    let name = newData.target.name;
    setUser({...user,[name]: newData.target.value})
  }
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
    // Retrieve the stored data when the component mounts
    const username = localStorage.getItem('username');
    const AIDManage=localStorage.getItem('AID');
    if (username) {
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
        quote: "Add user"
      }));
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('/adduser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response)
        if (response.status !== 200) {
          console.log("bad");
          throw new Error(response.statusText);
        }
      })
      .catch((err) => {
        console.log(err.toString());
        console.log('error front');
      });
      console.log("finish add")
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
          <h1 className="text-3xl pt-12 ">ADD Admin</h1>
        </div>
      </div>

    <form className="p-72 sm:ml-64 pt-12 items-center" onSubmit={handleSubmit} > 
   
        <label for="first_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">First name</label>
      <input type="text" name="firstname" id="first_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />

        <label for="last_name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Last name</label>
      <input type="text" name="lastname" id="last_name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />

        <label for="phone" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Phone number</label>
      <input type="text" name="phone" id="phone" onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />

        <label for="mail" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</label>
      <input type="email" name="email"  id="mail" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />

         <label for="username" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Username</label>
      <input type="text" name="username" id="username" onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />

        <label for="pass" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" name="pass" id="pass" onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        
        
        <Link to="/usermanage">
          <button   value="Submit" className="bg-slate-950 hover:bg-red-700 text-white py-2 px-4 rounded mt-5 mr-5" >
            back
          </button>
        </Link>

        <button  type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-5" >
          confirm
        </button>
        
      </form>

    </div>
  )
};

export default Adduser;
