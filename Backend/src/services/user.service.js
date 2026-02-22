import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

class UserService {
  async createUser(userData) {
    const { name, email, password } = userData;

    //checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Invalid Credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials", 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export default new UserService();
