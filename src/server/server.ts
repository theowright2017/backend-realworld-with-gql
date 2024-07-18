import express from "express";
import userRouter from "../routes/userRoute";
import morgan from "morgan";
import cors from "cors";
import profileRouter from "../routes/profileRoute";
import articleRouter from "../routes/articleRoute";
import { validate } from "../middleware/validate";
import commentRouter from "../routes/commentRoute";
// import tagsRouter from "../routes/tagsRoute";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
	console.log("HOME-----");
	res.json({ message: "You Are Home" });
});

app.use("/api", validate, userRouter)
app.use("/api", validate, profileRouter)
app.use("/api", validate, articleRouter)
app.use("/api", validate, commentRouter)
// app.use("/api", validate, tagsRouter)

export default app;
