import express from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import TokenService from "./TokenService";
import ApiError from './../exceptions/ApiError';
import { v4 as uuidv4 } from "uuid";
dotenv.config();

interface IUserData {
  email: string;
  password: string;
}

class UserService {
  async register(data: IUserData) {
    const { email, password } = data;
    const candidate = await UserModel.findOne({ email: email });

    // if (candidate) {
    //   throw ApiError.BadRequest("User already exists.");
    // }
    const hashPassword = bcrypt.hashSync(password, 7);

    const userModel = new UserModel({ email, password: hashPassword });
    const createdUser = await userModel.save();
    const activationLink = uuidv4();
    const tokens = TokenService.generateTokens(createdUser);

    return { ...tokens, createdUser };
  }

  async login(data: IUserData) {
    const { email, password } = data;
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      throw new Error("User not found.");
    }
    const validatePassword = bcrypt.compareSync(password, foundUser.password);
    if (!validatePassword) {
      throw new Error("Password invalid.");
    }
    const tokens = TokenService.generateTokens(foundUser);

    return { ...tokens, foundUser };
  }

  async getUsers(): Promise<any> {
    const allUsers = await UserModel.find();
    return allUsers
  }
}

export default new UserService();
