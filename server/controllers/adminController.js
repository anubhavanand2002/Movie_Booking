import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//register function for admin
export const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let existingAdmin;
    existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(201).json({
        status: false,
        message: "Admin Already Registered or Found!!",
      });
    }
    const hashedPassword = bcrypt.hashSync(password);
    let admin = new Admin({
      email,
      password: hashedPassword,
    });
    await admin.save();
    return res.status(200).json({
      status: true,
      message: "Admin Registerd Successfully!!!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

//login function
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let admin;
    admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(201)
        .json({ status: false, message: "User not Registered!!" });
    }
    const is_Match = bcrypt.compare(password, admin.password);
    if (!is_Match) {
      return res
        .status(201)
        .json({ status: false, message: "Email or Password may be wrong!!" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      isAdmin: true,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ status: true, message: "Login Successfully!!!", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

//get all admins function

export const getAllAdmin = async (req, res) => {
  let admin;
  try {
    admin = await Admin.find();
    if (!admin.length) {
      return res
        .status(201)
        .json({ status: false, message: "No AAdmin found!!" });
    }
    return res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

//getting admmin by ids
export const getAdminById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let admin;
    admin = await Admin.findById(id);
    if (!admin) {
      return res.status(201).json({
        status: false,
        message: "Something wrong no admin found with the given id!!",
      });
    }
    return res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};
