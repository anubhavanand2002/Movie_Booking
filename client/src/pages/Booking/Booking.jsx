import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import './Booking.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {message} from "antd";
export default function Booking() {
    const {id}=useParams();
    const[Movie,setMovie]=useState();
    const[date,setDate]=useState("");
    const[seat,setSeat]=useState();
    const {user}=useSelector((state)=>state.user);
const navigate=useNavigate();

    const handleBooking=()=>{
         axios.post("https://moviebooking-api.vercel.app/api/booking/book",{
          movie:id,
          date:date,
          seatNumber:seat,
          user:user.id,
         })
         .then((result)=>{
            if(result.data.status)
            {
              message.success(result.data.message);
              navigate("/");
            }
            else{
                message.error(result.data.message);
            }
         })
         .catch((error)=>{
            console.log(error);
         })
    }

    //getting details of movie
    const getMovie=()=>{
    axios.get(`https://moviebooking-api.vercel.app/api/movie/getById/${id}`)
    .then((result)=>{
        console.log(result);
        setMovie(result);
    }).catch((error)=>{
        console.log(error)
    })
}

    useEffect(()=>{
       getMovie();
    },[])

  return (
    <div className='col'>
        <h1>Booking Your Rocketry</h1>
    <div className='booking-container'>
       {
        Movie&&<div className='description'>
                <img src={Movie.data.movie.posterUrl}></img>
                    <div>
                        <h4>Description</h4>
                        <span>{Movie.data.movie.description}</span>
                        <h4>Actors</h4>
                        <ul>
                            {
                                 Movie.data.movie.actors.map((items)=>{
                                    return <li>{items}</li>
                                 })
                            }
                        </ul>
                        <h4>ReleaseDate:  </h4>
                        <span>{new Date(`${Movie.data.movie.releaseDate}`).toLocaleDateString()}</span>
                    </div>

            </div>
        }
          
         
                <div className='book-info'>
                    <div className='seat'>
                        <p>Seat Number</p>
                        <input 
                        type='number'
                        value={seat}
                        onChange={(e)=>{setSeat(e.target.value)}}
                        />
                    </div>
                    <div className='date'>
                        <p>Enter date</p>
                        <input 
                        type='date' 
                        value={date}onChange={(e)=>{setDate(e.target.value)}}/>
                    </div>
                    <button type='submit' onClick={()=>{handleBooking()}}>Book Now</button>
              </div>

    </div>
    </div>
  )
}
