import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";

export const addMovie = async (req, res, next) => {
  const {
    title,
    description,
    actors,
    releaseDate,
    posterUrl,
    featured,
    adminId,
  } = req.body;
  try {
    const newMovies = new Movie({
      title,
      description,
      actors,
      releaseDate:new Date(releaseDate),
      posterUrl,
      featured,
      admin: adminId,
    });
    await newMovies.save();

    const adminUser = await Admin.findById(adminId);
    adminUser.addedMovies.push(newMovies);
    await adminUser.save();

    return res
      .status(200)
      .json({ status: true, messsage: "Movie Added Successfully!!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Errror!!!" });
  }
};

export const getAllmovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
    if (!movies.length) {
      return res
        .status(201)
        .json({ status: false, message: "No movies found!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Following movies found:", movies });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Errror!!!" });
  }
};

export const getMovieById = async (req, res) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
    if (!movie) {
      return res
        .status(201)
        .json({
          status: false,
          message:
            "Please check your id nothing match found with the given id!!",
        });
    }
    return res.status(200).json({ movie:movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Errror!!!" });
  }
};
