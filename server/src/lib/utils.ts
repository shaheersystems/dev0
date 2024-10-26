import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const comparePassword = (password: string, hash: string) => {
  const match = bcrypt.compare(password, hash);
  return match;
};

export const hashPassword = (password: string) => {
  const hash = bcrypt.hash(password, 5);
  return hash;
};

export const createJWT = (user: { id: string }) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET as string
  );
  return token;
};
