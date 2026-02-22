import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

class UserService {
  async createUser(userData) {
    const { name, email, password } = userData;

    //checking if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const user = await userRepository.create({
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
}

export default new UserService();
