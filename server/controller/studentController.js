import { resolve } from "path";
import User from "../model/studentModel.js";

// logic for getting all users from database
export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const fetchOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ rollNumber: id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// logic for creating new user from database
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    console.log(userData);
    const { rollNumber } = userData;
    const userExist = await User.findOne({ rollNumber });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// logic for update a user
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// logic for delete a user from database
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
