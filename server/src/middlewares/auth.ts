import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({
      message: "Not Authorized",
    });

    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({
      message: "Not a valid token.",
    });
  }
};
