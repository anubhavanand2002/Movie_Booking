import express from "express";
import {
  getAdminById,
  getAllAdmin,
  register,
  getAllBookings,
} from "../controllers/adminController.js";
import { login } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/signup", register);
adminRouter.post("/signin", login);
adminRouter.post("/getAll", getAllAdmin);
adminRouter.get("/getById/:id", getAdminById);
adminRouter.get("/getAllBookings", getAllBookings);

export default adminRouter;
