import { GCAM_GET_REQUEST } from '@/Components/API/API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import axios from 'axios'
import React, { useState } from 'react'
import { setCookie , getCookie } from "cookies-next";
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
export default function Login() {
    const [userName , setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message , setMessage] = useState('')
    async function onLoginClick(){
      const result = await axios.post('http://localhost:3000/api/gcam/login', 
      {
        "userName" : userName,
        "password" : password,
        "onlyAuthentication" :false
    }).then( (res)=>{ return res.data} )
      console.log(result)
      setMessage(result.message)
    }
    console.log(getCookie('Token'))
  return (
    <div className='grid bg-slate-600 h-screen items-center gap-4 justify-items-center shadow-3xl drop-shadow-3xl rounded-3xl'>

    <div className = 'grid items-center p-5 '>
    <div className='m-3 font-thin text-3xl text-white'> Admin Login pannel</div>
    <div className='m-3'><input type='text' onChange={(e)=> setUserName(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black '/></div>
    <div className='m-3'><input type='text' onChange={(e)=> setPassword(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/></div>
    <button onClick={()=>onLoginClick()} className = 'text-white p-4 bg-purple-600 active:ring rounded-3xl'> Login </button>
    {message}
    
    </div>
    
    </div>
  )
}
