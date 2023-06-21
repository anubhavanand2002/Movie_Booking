import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let existingUser;
  let existingMovie;
  try {
    existingUser = await User.findById(user);
    existingMovie = await Movie.findById(movie);
    if (!existingUser) {
      return res.status(201).json({
        status: false,
        message: "User not found with the given id!!!",
      });
    }
    if (!existingMovie) {
      return res.status(202).json({
        status: false,
        message: "Movie not found with the given id!!",
      });
    }
    let newBooking;
    newBooking = new Booking({
      movie,
      date,
      seatNumber,
      user,
    });
    existingUser.bookings.push(newBooking);
    existingMovie.bookings.push(newBooking);
    await existingUser.save();
    await existingMovie.save();
    await newBooking.save();
    return res.status(200).json({
      status: true,
      message: "New Booking is done successfully!!",
      newBooking,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Errror!!!" });
  }
};

export const getBookingById = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(201).json({
        status: false,
        message: "No booking found with the given id!!",
      });
    }
    return res
      .status(200)
      .json({ status: true, message: "Booking Found is:", booking });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Errror!!!" });
  }
};

export const deleteBookingById = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findByIdAndDelete(id)
      .populate("movie")
      .populate("user");

    await booking.movie.bookings.pull(booking);
    await booking.movie.save();

    await booking.user.bookings.pull(booking);
    await booking.user.save();

    if (!booking) {
      return res
        .status(201)
        .json({ status: false, message: "There is some error in deletion!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Deleted Successfully!!", booking });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Errror!!!" });
  }
};
