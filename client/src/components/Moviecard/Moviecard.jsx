import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
export default function Moviecard({ data ,id}) {
  const navigate=useNavigate();
  const handleSubmit=()=>{
     navigate(`/auth/booking/${id}`);
  }
  return (
    <div className="moviecard-container">
      <div className="image">
        <img src={data.posterUrl} />
      </div>

      <div className="detail">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <p>{data.releasedate}</p>
      </div>

    <button onClick={(e)=>{handleSubmit()}}>Book Now</button>
    </div>
  );
}
