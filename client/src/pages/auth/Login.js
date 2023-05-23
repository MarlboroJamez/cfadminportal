import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login({history}) {
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const cookies = new Cookies();

  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }
  const handleLogin = async () => {
    const {data} = await axios.post('/login',{
      email: email
    },config)

    

    if(data.token){
      cookies.set('auth_state', data.token, { path: '/' });
      history.push('/dashboard')
    }
  }
  return (
    <div className="h-screen w-full grid place-items-center">
        <div className="h-fit w-fit grid">
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text" className="shadow outline-yellow-400 rounded m-2 p-1 border border-neutral-200 w-72" placeHolder="Email address"/>

            <button 
            onClick={handleLogin}
            className="transition duration-400 shadow p-2 rounded bg-yellow-600 hover:bg-yellow-500 w-72 m-2 mt-4 text-white font-bold">
                Login
            </button>
        </div>
    </div>
  )
}

export default Login