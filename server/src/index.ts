import express, { Express, Request, Response } from "express";
import InjectRoutes from "./routes/router";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware";
import cookieParser from "cookie-parser";
import EventEmitter from "events";
import dotenv from "dotenv";
import ConnectDatabase from "./config/db";
import path from "path";

dotenv.config();

ConnectDatabase();

const PORT = process.env.PORT || 3030;

const app: Express = express();

export const eventEmitter = new EventEmitter();

// middlewares for the application
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// add all routes for the application
InjectRoutes(app);
// add Custom Error Handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
