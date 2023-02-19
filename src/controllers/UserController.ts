import express from "express";
import UserService from "../services/UserService";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Validation errors.", errors.array()))
      }
      const createdUserWithTokens = await UserService.register(req.body);
      res.status(201).json(createdUserWithTokens);
    } catch (e: unknown) {
      next(e);
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const foundUser = await UserService.login(req.body);
      res.status(200).json(foundUser);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(500).json(e.message);
      }
    }
  }

  async getUsers(req: any, res: express.Response) {
    try {
      // console.log(req.user);
      // const users = await UserService.getAllUsers();
      // res.json(users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(500).json(e.message);
      }
    }
  }
}

// default permite dar o nome personalizado da importação
export default new UserController();import ApiError from './../exceptions/ApiError';

