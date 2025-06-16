import jwt from "jsonwebtoken";

async function isAuthenticted(req, res, next) {
  try {
    const token = req.cookies["authToken"];
    console.log(req);
    if (!token) {
      return res.status(400).send({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = jwt.decode(token, process.env.JWT_SECRETKEY);
    req._id = decode.uId;
    next();
  } catch (error) {
    console.log("Error in isAuthenticated middleware", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
}
export default isAuthenticted;
