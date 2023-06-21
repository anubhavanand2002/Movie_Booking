import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Booking from "../models/Booking.js";
import Admin from "../models/Admin.js";
//getting all users saved in dataBase
export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
    if (!users) {
      return res
        .status(201)
        .json({ status: false, message: "Unexpected error occoured!!" });
    }
    return res.status(201).json({ users });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};
//register handler function for user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user;
    user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = bcrypt.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ status: true, message: "User Registered Successfully!!" });
    }
    return res
      .status(201)
      .json({ status: false, message: "User already exist!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!" });
  }
};

//login handler function for user
export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let existingUser;
    existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res
        .status(201)
        .json({ status: false, message: "Email not found!!" });
    }
    const is_Match = await bcrypt.compare(password, existingUser.password);
    if (!is_Match) {
      return res
        .status(201)
        .json({ status: false, message: "Email or Password may be Wrong!!" });
    }

    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      isAdmin: false,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ status: true, message: "User Login Successfully!!", token });
  } catch (error) {
    return res
      .status(501)
      .json({ status: false, message: "Internal Server error!!" });
  }
};

//update the user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  try {
    let user;
    user = await User.findByIdAndUpdate(id, {
      name,
      password: hashedPassword,
    });
    if (!user) {
      return res
        .status(201)
        .json({ status: false, message: "User not found!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Users data updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal server error!!" });
  }
};
//deleting the user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(201)
        .json({ status: false, message: "Unexpected error occoured!!" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Deleted Successfully!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

//getBookingDetails by usersid
export const getBookingofUser = async (req, res) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Booking.find({ user: id })
      .populate("movie")
      .populate("user");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
  if (!bookings.length) {
    return res
      .status(201)
      .json({ status: false, message: "No Bookings found!!" });
  }
  // console.log(bookings);
  return res.status(200).json({ bookings });
};

//getting user by id
export const getuserById = async (req, res) => {
  const id = req.params.id;
  try {
    let user;
    user = await User.findById(id);
    if (!user) {
      return res
        .status(201)
        .json({ status: false, message: "User Not found!!" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

//giving the user info
export const getUser = async (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decrypted) => {
      if (err) {
        console.log(err);
        return res
          .status(201)
          .json({ status: false, message: "Something Went Wrong !!" });
      } else {
        const { isAdmin, id } = decrypted;
        if (isAdmin) {
          const user = await Admin.findById(id);
          return res.status(200).json({
            status: true,
            user: { name: "Admin", id: user._id, isAdmin: true },
          });
        } else {
          const user = await User.findById(id);
          return res.status(200).json({
            status: true,
            user: { name: user.name, id: user._id, isAdmin: false },
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!" });
  }
};
