import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

import userRouter from "./routes/userRoutes.js";
app.use("/api/user", userRouter);

import movieRouter from "./routes/movieRoutes.js";
app.use("/api/movie", movieRouter);

import adminRouter from "./routes/adminRoutes.js";
app.use("/api/admin", adminRouter);

import bookingRouter from "./routes/bookingRouter.js";
app.use("/api/booking", bookingRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port number ${process.env.PORT}`);
});
