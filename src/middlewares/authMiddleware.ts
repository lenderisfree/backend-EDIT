import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import { Request, Response, NextFunction } from "express";
interface TokenPayload {
  roles: string[];
}
export default (req: any, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      String(process.env.SECRET_KEY)
    ) as TokenPayload;

    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Bad format token" });
  }
};
