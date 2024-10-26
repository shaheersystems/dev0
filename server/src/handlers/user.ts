import { StatusCodes } from "http-status-codes";
import { db } from "../config/prisma";
import { Request, Response } from "express";
import { comparePassword, createJWT, hashPassword } from "../lib/utils";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await db.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT({ id: user.id });
    res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found!",
      });
    } else {
      const isValid = await comparePassword(req.body.password, user.password);

      if (!isValid) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid Username or password",
        });
        return;
      }

      const token = createJWT({
        id: user.id,
      });
      // Send the token back to the client
      res.json({ token });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
