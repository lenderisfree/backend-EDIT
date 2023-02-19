import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  id: string
}
class TokenService {
  generateTokens(user: any) {
    const payload = { id: user.id };
    const accessToken = jwt.sign(
      payload,
      String(process.env.JWT_ACCESS_SECRET_KEY),
      { expiresIn: "15d" }
    );
    return { accessToken };
  }
  validateAccessToken(token: string) {
    try {
      const userPayload = jwt.verify(
        token,
        String(process.env.JWT_ACCESS_SECRET_KEY)
      );
      return userPayload as TokenPayload;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
