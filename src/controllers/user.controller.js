import { User } from "../models/UserDetails.model.js";
import bcrypt from "bcryptjs";

//! get a user by Login
export const getUserByDetails = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    email = email.toLowerCase().trim();
    console.log("Normalized email:", email);

    const userFound = await User.findOne({ email }).select("+password");
    console.log("User found:", userFound);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        username: userFound.username,
        email: userFound.email,
        id: userFound._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Could not find user" });
  }
};

//! get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting all users");
    res.status(500).json({ error, message: "error whilst getting all users" });
  }
};

//! create a user
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ email, password, username });

    await newUser.save();
    res.status(201).json({ message: "User was created successfully" });
  } catch (error) {
    console.log({ error, message: "Error creating user" });
    res.status(500).json({ message: "Issue creating user" });
  }
};

//! delete User by id
export const deleteUserById = async (req, res) => {};
