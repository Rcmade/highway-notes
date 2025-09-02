import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import passport from "passport";
import { setupPassport } from "./lib/passport/passport";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/notesRoutes";

dotenv.config();

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3300",
      "http://localhost:5173",
      "https://hd.rcmade.me",
    ],
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(passport.initialize());
setupPassport();
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
