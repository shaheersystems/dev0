import { StatusCodes } from "http-status-codes";
import { llm } from "../config/langchain";
import { Request, Response } from "express";
import { db } from "../config/prisma";

export const aiReview = async (req, res) => {
  try {
    const query = req.body.query;
    const userId = req.user.id;
    const aiResponse = await llm.invoke([
      [
        "system",
        "You are a knowledgeable assistant specializing in code review. Your task is to assess code quality, provide constructive feedback, and assign a grade based on best practices, readability, efficiency, and adherence to coding standards. Be thorough, objective, and provide actionable insights to help improve the code.",
      ],
      ["human", query],
    ]);
    const review = await db.reviews.create({
      data: {
        title: aiResponse.content.slice(0, 30) + "...",
        content: aiResponse.content as string,
        type: "AI",
        query,
        userId: userId,
      },
    });
    res.status(StatusCodes.OK).json({
      message: "AI response generated successfully.",
      data: review,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const allReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await db.reviews.findMany({
      where: {
        userId,
      },
    });
    res.status(StatusCodes.OK).json({
      message: "Reviews fetched successfully!",
      reviews,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
