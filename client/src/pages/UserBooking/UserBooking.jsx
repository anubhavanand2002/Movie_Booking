import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./UserBooking.css";
export default function UserBooking() {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const getInfo = () => {
    axios
      .get(`https://moviebooking-api.vercel.app/api/user/getBooking/${user.id}`)
      .then((result) => {
        setData(result.data.bookings);
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
      <h1> All Bookings</h1>
      <div className="main-container">
        <div className="user-booking-image">
          <ion-icon name="person"></ion-icon>
          <h2>{user && user.name}</h2>
        </div>
        <div className="userbooking-controller">
          {data &&
            data.map((items, index) => (
              <div className="des" key={index}>
                <span>Title: {items.movie.title}</span>
                <span>SeatNumber: {items.seatNumber}</span>
                <span>
                  Release:
                  {new Date(items.movie.releaseDate).toLocaleDateString()}
                </span>
                <span><ion-icon name="trash-outline"></ion-icon></span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
