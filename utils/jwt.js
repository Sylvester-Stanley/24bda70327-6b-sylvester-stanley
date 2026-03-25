import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing from your .env file");
  }
  return secret;
};

const generateToken = (userId) => {
  const secret = getJwtSecret();
  return jwt.sign(
    { userId },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
};

export { getJwtSecret, generateToken };