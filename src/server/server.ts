import express from "express";
import userRouter from "../routes/userRoute";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
	console.log("HOME-----");
	res.json({ message: "You Are Home" });
});

app.use("/api", userRouter)

export default app;
