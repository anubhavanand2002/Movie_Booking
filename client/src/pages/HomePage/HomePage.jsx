import React,{useEffect, useState} from 'react'
import Moviecard from '../../components/Moviecard/Moviecard'
import './HomePage.css';
import axios from "axios";
export default function HomePage() {
    const[data,setdata]=useState([]);
    
    //function for fetching data from the database
    const handleMovies=async()=>[
        await axios.get("https://moviebooking-api.vercel.app/api/movie/getall-movies")
        .then((result)=>{
            console.log(result);
            setdata(result.data.movies);
        }).catch((error)=>{
            console.log(error);
        })
    ]

    useEffect(()=>{
      handleMovies();
    },[])
  return (
    <div className='homepage-container'>
        {data.map((items)=>{
            return  <Moviecard data={items} id={items._id}/>;
        })}
         
    </div>
  )
}
