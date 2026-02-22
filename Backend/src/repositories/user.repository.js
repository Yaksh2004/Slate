import User from "../models/User.js";

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findAll() {
    return await User.find();
  }
}

export default new UserRepository();
