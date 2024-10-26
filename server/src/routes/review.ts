import { Router } from "express";
import { validator } from "../middlewares/validator";
import { reviewSchema } from "../schemas/review";
import { aiReview, allReviews } from "../handlers/review";
import { auth } from "../middlewares/auth";

export const router = Router();

router.post("/", validator(reviewSchema), aiReview);
router.get("/", allReviews);
