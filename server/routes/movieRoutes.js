import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  addMovie,
  getAllmovies,
  getMovieById,
} from "../controllers/movieController.js";
const movieRouter = express.Router();

movieRouter.post("/add-movie", adminAuth, addMovie);
movieRouter.get("/getall-movies", getAllmovies);
movieRouter.get("/getById/:id", getMovieById);
export default movieRouter;
