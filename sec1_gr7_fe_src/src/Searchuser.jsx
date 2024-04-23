import React, {  useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const Searchuser = () => {
const [data,setdata]=  useState('')
const [value,setValue] = useState({
    userID:'',
    username:'',
    firstname: '',
    lastname: '',
    phone: '',
    email:''
  });
  const handleChange = (newData) => {
    let name = newData.target.name;
    console.log(newData.target.value)
    setValue({...value,[name]: newData.target.value})
  }
  const handleSearch = async (event) => {
    event.preventDefault(); 
    const queryString = new URLSearchParams(value).toString();
    console.log("Query String:", queryString);

    try {
        const response = await fetch(`/advancedsearchadmin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //get results
        const searchResults = await response.json();
        setdata(searchResults);
        console.log("Search Results:", searchResults);

    } catch (error) {
        console.error('Error:', error);
        // Handle error 
    }
};

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
  });

const handleClear = () => {
    //to clean existing data
    window.location.reload(); 
  };


  return (
    <div className="p-4">
    <div className="p-4 sm:ml-64 shadow-md ">
     
        <div className="px-8">
          <h1 className="text-3xl pt-12 ">Search Admin</h1>
          </div>
    </div>

<form class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 sm:ml-64 " onSubmit={handleSearch}>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            
        </thead>
        <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Admin ID
                </th>
                <td class="px-12 py-4">
                <input id="chat" rows="1"  name="userID" onChange={handleChange} class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin ID"></input>
                </td>
              
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Username
                </th>
                <td class="px-12 py-4">
                <input id="chat" rows="1"  name="username"onChange={handleChange} class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username"></input>
                </td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    First Name
                </th>
                <td class="px-12 py-4">
                <input id="chat" name="firstname" rows="1" onChange={handleChange} class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name"></input>
                </td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                   Last Name
                </th>
                <td class="px-12 py-4">
                <input id="chat" name="lastname" rows="1" onChange={handleChange} class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name"></input>
                </td>
            </tr>
            <tr>
            <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Phone No.
                </th>
                <td class="px-12 py-4">
                <input id="chat"name="phone" rows="1" onChange={handleChange} class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone No."></input>
                </td>
            </tr>
            <tr>
            <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Email
                </th>
                <td class="px-12 py-4">
                <input id="chat" name="email" onChange={handleChange} type="email" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"></input>
                </td>
            </tr>
        </tbody>
        
        
    </table><div className="flex justify-center mt-4 p-4">
        <button  type="submit" value="Submit" className="justify-end mt-4   bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded items-right ">
          Search
          </button>
          <Link to="/usermanage">
          <button  onClick={handleClear}  className="justify-end mt-4  ml-5 bg-slate-950 hover:bg-slate-700 text-white py-2 px-4 rounded items-right ">
          Clear
          </button></Link></div>
    
</form>
        <div className="Tablebox ml-12 ">
                    <table className="ml-60">
                    <thead>
                        <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>ID</th>
                        </tr>
                    </thead>
                    <tbody className="ml-24 ">
                        {data && data.map((user) => (
                        <tr key={user.AID}>
                            <td className="p-3">{user.AFname}</td>
                            <td className="p-3">{user.ALname}</td>
                            <td className="p-3">{user.Aemail}</td>
                            <td className="p-3">{user.Username}</td>
                            <td className="p-3">{user.AID}</td>
                            <td className="flex">
                           
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

      
    </div>)}
;

export default Searchuser;
