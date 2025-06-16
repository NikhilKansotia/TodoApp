import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import bcrypt, { hash } from "bcryptjs";

export async function signup(req, res) {
  const { username, email, phoneNumber, password } = req.body;
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).send({
      message: "Please provide details for all the fields",
      success: false,
    });
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).send({
      message: "User already exists",
      success: false,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
    phoneNumber,
  });
  await user.save();
  res.status(200).send({
    message: "User created successfully.",
    success: true,
    user,
  });
  try {
  } catch (error) {
    console.log("Error in signup api", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "Please provide details for all the fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User not exists. Please signup first",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Password doesnt match.",
        success: false,
      });
    }
    const payload = { uId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRETKEY);
    res
      .cookie("authToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .send({
        message: "Login successfull.",
        success: true,
      });
  } catch (error) {
    console.log("Error in login api", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("authToken", "", { maxAge: 0 }).status(200).send({
      message: "User logged out successfully.",
      success: false,
    });
  } catch (error) {
    console.log("Error in logout api", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
}

export async function resetPassowrd(req, res) {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).send({
        message: "Please provide details for all the fields",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(req._id, {
      password: hashedPassword,
    });
    res.status(200).send({
      message: "Password reset successfull",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in resetPassword api", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
}

export async function verifyToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = jwt.decode(token, process.env.JWT_SECRETKEY);
    if (!decode) {
      return res.status(400).send({
        message: "User not authenticated",
        success: false,
      });
    }
    res.status(200).send({
      message: "User authenticated",
      success: true,
    });
  } catch (error) {
    console.log("Error in verifyToken API", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
}
