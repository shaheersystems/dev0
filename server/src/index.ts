import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { router as userRouter } from "./routes/user";
import { router as reviewRouter } from "./routes/review";
import { auth } from "./middlewares/auth";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", async (req, res) => {
  res.send({
    message: "Hello, world",
  });
});

// user routes
app.use("/api/auth", userRouter);
app.use("/api/reviews", auth, reviewRouter);

app.listen(3000, () => {
  console.log(`
        The server is running on port http://localhost:3000 .
        Enjoy development 🚀 .
        `);
});
