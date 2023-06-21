import express from "express";
import {
  deleteUser,
  getAllUsers,
  getBookingofUser,
  getUser,
  getuserById,
  login,
  register,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signin", login);
userRouter.get("/", getAllUsers);
userRouter.post("/updateUser/:id", updateUser);
userRouter.post("/deleteUser/:id", deleteUser);
userRouter.get("/getBooking/:id", getBookingofUser);
userRouter.get("/getUserId/:id", getuserById);
userRouter.post("/get-user", getUser);

export default userRouter;
