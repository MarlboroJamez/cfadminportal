import React from 'react'
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

//ASSETS
import LogoPNG from '../../assets/images/logo.png';
import LogoTPNG from '../../assets/images/Logo.jpg';

function Header() {
const cookies = new Cookies();

const handleLogout = () => {
    cookies.remove('auth_state', { path: '/' })
    window.location.replace('https://compensation-funds.loca.lt/')
}
  return (
    <div className="h-20 flex justify-between bg-white border-b-2 border-yellow-400 shadow-lg">
        <div className="flex w-full">
            <img src={LogoPNG} alt="" className="mr-20 h-16 m-1 rounded"/>

            
            {/* 
            <ul className="flex mt-10 justify-center text-lg pt-1">
                <Link to="/dashboard">
                    <li className="mr-10 font-medium text-zinc-600 hover:text-zinc-900 transition duration-400 cursor-pointer">
                        Directory
                    </li>
                </Link>
            </ul> */}
        </div>

        <div className="grid mr-10 mt-8 place-items-center">
            <button 
            onClick={handleLogout}
            className="flex">
                Logout
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-400 mt-0.5 ml-3 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Header