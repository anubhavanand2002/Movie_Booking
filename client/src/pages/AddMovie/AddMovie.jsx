import React, { useEffect, useState } from "react";
import "./AddMovie.css";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [name1, setName1] = useState("");
  const [name, setName] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releasedate, setReleasedate] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [featured, setFeatured] = useState(true);

  function handleClick(e, index) {
    e.preventDefault();
    setName(
      name.filter((item, ind) => {
        return ind != index;
      })
    );
  }

  const handleSubmit=async()=> {
    console.log({
      name,
      title,
      description,
      releasedate,
      posterUrl,
      featured,
      name1,
    });

    await axios
      .post(
        "https://moviebooking-api.vercel.app/api/movie/add-movie",
        {
          title,
          description,
          actors: name,
          releaseDate: releasedate,
          posterUrl,
          featured,
        },
        {
          headers: 
          {
            "Authorization":`Bearer ${token}`
          },
        }
      )
      .then((result) => {
        if (result.data.status) {
          console.log(result)
          message.success(result.data.messsage);
          navigate("/");
        } else {
          message.error(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const item = localStorage.getItem("token");
    if (item) setToken(item);
  }, []);

  return (
    <div className="add-movie-container">
      <h1 className="title">Add Movie</h1>

      <p>Title</p>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>

      <p>Description</p>
      <textarea
        placeholder="Enter description"
        rows={10}
        cols={276}
        className="description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>

      <p>Release date</p>
      <input
        type="date"
        placeholder="Enter date"
        value={releasedate}
        onChange={(e) => {
          setReleasedate(e.target.value);
        }}
      ></input>

      <p>Post Url</p>
      <input
        type="text"
        placeholder="Enter url"
        value={posterUrl}
        onChange={(e) => {
          setPosterUrl(e.target.value);
        }}
      ></input>

      <p>Actors name</p>
      <div className="actors-name">
        <div>
          <input
            type="text"
            placeholder="Enter the Actors name"
            value={name1}
            onChange={(e) => {
              setName1(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              setName([...name, name1]);
            }}
          >
            Add Actor
          </button>
        </div>
        <div className="display">
          {name.map((items, index) => {
            return (
              <div className="display1">
                <p>{items}</p>
                <ion-icon
                  name="close-outline"
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                ></ion-icon>
              </div>
            );
          })}
        </div>
      </div>

      <div className="check">
        <p>Featured</p>
        <input
          type="checkbox"
          value={featured}
          onChange={(e) => {
            setFeatured(e.target.value);
          }}
        ></input>
      </div>
      <div className="final-submit">
        <button
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// title:{
//     type:String,
//     required:true,
// },
// description:{
//     type:String,
//     required:true,
// },
// actors:[{type:String,required:true}],
// releaseDate:{
//     type:Date,
//     required:true,
// },
// posterUrl:{
//     type:String,
//     required:true,
// },
// featured:{
//     type:Boolean,
// },
// bookings:[{type:mongoose.Types.ObjectId,ref:"Booking"}],
// admin:{
//     type:mongoose.Types.ObjectId,
//     ref:"Admin",
//     required:true,
// }
