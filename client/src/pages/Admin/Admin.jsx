import React,{useState} from 'react'
import './Admin.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import {message} from "antd";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../../Redux/Features/UserSlice';
export default function Admin() {
  const navigate=useNavigate();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState(""); 

    const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = () => {
    axios
      .post("http://localhost:5000/api/user/get-user", {
        token: localStorage.getItem("token"),
      })
      .then((result) => {
        console.log(result.data.user);
        dispatch(setUser(result.data.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const submitHandler=()=>{
        axios.post("http://localhost:5000/api/admin/signin",{
            email,
            password
        }).then((result)=>{
            if(result.data.status)
            {
             message.success(result.data.message);
             console.log(result.data.token);
             localStorage.setItem("token",result.data.token);
              navigate("/");
              getUser();
            }
            else
            message.error(result.data.message);
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div>
      <div className='admin-login-container'>
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
        <button type='submit' className='butt'
        onClick={()=>{submitHandler()}}
        >Submit</button>
        <p>Are You a new user?
            <Link to="/admin/signup">
                 <button className='admin-but'>Sign Up</button>
            </Link>
        </p>
      </div>
    </div>
  )
}
