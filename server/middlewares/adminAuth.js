import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decrypted) => {
      if (err) {
        console.log(err);
        return res
          .status(201)
          .json({ status: false, message: "Something went wrong!!" });
      } else {
        const { isAdmin, id } = decrypted;
        if (isAdmin) {
          req.body.adminId = id;
          next();
        } else {
          return res
            .status(202)
            .json({ status: false, message: "You are not an Admin" });
        }
      }
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication Failed!!" });
  }
};

//bearer jfksjfkvbfkvvn(token)
export default adminAuth;
