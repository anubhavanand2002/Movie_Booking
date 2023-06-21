import React,{useState} from 'react'
import './AdminRegister.css';
import { Link } from 'react-router-dom';
import {message} from "antd";
import axios from "axios";

export default function AdminRegister() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const submitHandler=()=>{
        axios.post("http://localhost:5000/api/admin/signup",{
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
      <div className='admin-register-container'>
        <h1 className='header'>Admin</h1>
        <div className='login'>
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
        <button type='submit' className='admin-register-butt'
        onClick={()=>{submitHandler()}}
        >Submit</button>
        <p>Have your already registered?
            <Link to="/admin/login">
                 <button className='admin-register-but'>Sign In</button>
            </Link>
        </p>
      </div>
    </div>
  )
}
