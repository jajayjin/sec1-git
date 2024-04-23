import { Link} from 'react-router-dom';
import logo from './asset/img/logo.png';
import React, {useState, useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { useHistory } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    };
    return ( 
        <nav>
            
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>



<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
      <li>
           <div class="h-20 w-20"></div>
           </li>
         <li>
            
               <Link to="/"><div class="grid place-items-center h-20 ">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-10 h-10">
  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
</svg>
</div>
           </Link>
            

         </li>
         <button>
            <div onClick={handleLogout} class="h-16 w-16 ml-20 hover:text-red-300">Logout</div>
         </button>
         
         <li>
         <div class="flex flex-col items-center justify-center h-20 hover:bg-red-300  
         @if(currentPath === '/usermanage')
         bg-[#dd610f]
         @if(currentPath === '/adduser')
         bg-[#dd610f]
         @if(currentPath === '/aboutus')
         bg-[#a8a29e]
         @elseif(currentPath === '/home')
         bg-[#a3a3a3]
            @endif" >
            <a href="/usermanage" class="max-w-50 flex flex-col items-center">
                <MdManageAccounts class="text-5xl "/>
                <div class="text-xl">Admin</div>
            </a>
        </div>
         </li>
         
         <li>
         <div class="flex flex-col items-center justify-center h-20 hover:bg-red-300  
          @if(currentPath === '/ProductManage' || currentPath === '/modifyproduct' || currentPath === '/home')
          bg-[#ea580c]
      @else
          bg-[#a3a3a3]
      @endif">
            <a href="/ProductManage" class="max-w-50 flex flex-col items-center">
                <FaBoxArchive class="text-4xl" color="#00000"/>
                <div class="text-xl">Product</div>
            </a>
        </div>
         </li> 
      </ul>
   </div>
</aside>


   </nav>

     );
}
 
export default Sidebar;