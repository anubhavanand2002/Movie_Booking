import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { message } from 'antd';
import './CheckDetails.css';
export default function CheckDetails() {
   

    const[details,setDetails]=useState("");

    const getAllDetails=()=>{
        axios.get("https://moviebooking-api.vercel.app/api/admin/getAllBookings")
        .then((result)=>{
           console.log(result);
            if(result.data.status)
            {
                setDetails(result.data.bookings);
            }
            else{
                message.error(result.data.message);
            }
        })
        .catch((error)=>{
            console.log(error);
        })

    }


    const convertDateFormat = dateString => (new Date(dateString)).toISOString().split('T')[0];



  useEffect(()=>{
    if(!details)
        getAllDetails();
  },[])

  return (
    <div className='check-detail-container'>
        <h1>BOOKING DETAILS</h1>
        <div className="main-container">
       {
         details &&  details.map((detail)=>{
            if(detail.bookings.length)
            {
            return(
            <div className='main1-container'>
                <div className="name">
                    <h2>Name</h2>
                    <p>{detail?.name}</p>
                </div>
                <div className="email">
                <h2>Email</h2>
                 <p>{detail?.email}</p>
                </div>
                <div className="bookings">
                <h2>Date</h2>
                        {
                          detail?.bookings.map((booking)=>{
                                return(
                                    <div className='booking'>
                                      {convertDateFormat(booking.date)}
                                    </div>
                                );
                            })
                        }
                </div>
                <div className="seat-number">
                <h2>Seat Number</h2>
                    {
                        detail?.bookings.map((booking)=>{
                            return(
                                <div className='seat'>
                                  {booking.seatNumber}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="titles">
                <h2>Title</h2>
                     {
                        detail?.bookings.map((booking)=>{
                            return(
                                <div className='seat'>
                                  {booking.movie.title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            );
                }
        })
       }
       </div>
    </div>
  )
}
