import React,{useState} from 'react'
import './AuthRegister.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import {message} from "antd";
export default function AuthRegister() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const submitHandler=()=>{
      axios.post("https://moviebooking-api.vercel.app/api/user/signup",{
        name,
        email,
        password
      }).then((result)=>{
        if(result.data.status)
        message.success(result.data.message);
        else
        message.error(result.data.message);
      }).catch((error)=>{
        console.log(error)
      })
    }
  return (
    <div>
      <div className='auth-register-container'>
        <h1 className='header'>Auth</h1>
        <div className='login'>
            <p>Enter Your name</p>
            <input 
            type='text' 
            placeholder='Enter Your Name'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            ></input>
           <p>Enter Your Email</p>
           <input 
           type='email' 
           placeholder='Enter Your Email'
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
           ></input>
           <p>Enter Your Password</p>
           <input 
           type='password' 
           placeholder='Enter Your Password'
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
           ></input>
        </div>
        <button 
        type='submit' 
        className='auth-register-butt'
        onClick={()=>{submitHandler()}}
        >Submit</button>
        <p>Have your already registered?
            <Link to="/user/login">
                 <button className='auth-register-but'>Sign In</button>
            </Link>
        </p>
      </div>
    </div>
  )
}
