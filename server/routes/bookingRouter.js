import express from "express";
import {
  deleteBookingById,
  getBookingById,
  newBooking,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/book", newBooking);
bookingRouter.get("/getBooking/:id", getBookingById);
bookingRouter.delete("/delete/:id", deleteBookingById);

export default bookingRouter;
