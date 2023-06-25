import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AdminMovies.css";
export default function AdminMovies() {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const getInfo = () => {
    axios
      .get(`https://moviebooking-api.vercel.app/api/movie/getall-movies`)
      .then((result) => {
        setData(result.data.movies);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user) getInfo();
  }, [user]);
  let k = 1;
  return (
    <div className="main1">
      <h1> All Movies</h1>
      <div className="main-container">
        <div className="admin-booking-image">
          <ion-icon name="person"></ion-icon>
          <h2>{user && user.name}</h2>
        </div>
        <div className="adminbooking-controller">
          {data &&
            data.map((items, index) => (
              <div className="des" key={index}>
                <span>Title: {items.title}</span>
                <span>
                  Release:
                  {new Date(items.releaseDate).toLocaleDateString()}
                </span>
                <span><ion-icon name="trash-outline"></ion-icon></span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
