import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Auth from "./pages/User/Auth.jsx";
import AdminRegister from "./pages/Register/AdminRegister/AdminRegister.jsx";
import AuthRegister from "./pages/Register/AuthRegister/AuthRegister.jsx";
import AddMovie from "./pages/AddMovie/AddMovie.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./Redux/Features/UserSlice.js";
import axios from "axios";
import Booking from "./pages/Booking/Booking.jsx";
import UserBooking from "./pages/UserBooking/UserBooking.jsx";
import AdminMovies from "./pages/AdminMovies/AdminMovies.jsx";

export default function App() {
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

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/*" element={<p>Page Not Found!!</p>}/>
        {!user &&
        <Route path="/admin/login" element={<Admin />} />
        }   
        {!user &&
        <Route path="/user/login" element={<Auth />} />
         }
         {!user &&
          <Route path="/user/signup" element={<AuthRegister />} />
         }
         {!user &&
          <Route path="/admin/signup" element={<AdminRegister />} />
         }
        {user && user.isAdmin &&
          <Route path="/admin/addmovie" element={<AddMovie />} />
        }
       
        <Route path="/" element={<HomePage />} />
        {user && !user.isAdmin &&
          <Route path="/auth/booking/:id" element={<Booking />} />
        }
        <Route path="/user" element={<UserBooking/>}/>
        <Route path="/admin" element={<AdminMovies/>}/>
      </Routes>
    </div>
  );
}
