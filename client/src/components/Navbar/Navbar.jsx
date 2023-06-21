import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Modal} from 'antd';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/Features/UserSlice';
export default function Navbar() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.user);
  const handleLogout=()=>{
    try{
     Modal.confirm({title:"Confirm",content:"Are You sure to Logout?",onOk(){
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/");
     }})
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return (
    <div className='container'>
      <ion-icon name="videocam"></ion-icon>
      <div className='search'>
            <input placeholder='Search across Multiple Movies' type='text' className='input'></input>
            <ion-icon name="search"></ion-icon>
      </div>
      <div className='but'>
        {user && user.isAdmin && <Link to="/admin/addmovie">
                <button className='button'>ADDMOVIES</button>
            </Link>}
            {user?
            <Link to={user.isAdmin?"/admin":"/user"}>
                <button className='button' >{user.name}</button>
            </Link>:
          <Link to="/user/login">
                <button className='button'>AUTH</button>
            </Link>
            }

          {user?
            <Link to="#">
                <button className='button' onClick={()=>{handleLogout()}}>LOGOUT</button>
            </Link>:
          <Link to="/admin/login">
                <button className='button'>ADMIN</button>
            </Link>
            }
      </div>
    </div>
  );
};
