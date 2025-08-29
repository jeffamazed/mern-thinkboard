import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import startServer from "./utils/startServer.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const __dirname = path.resolve();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
} else {
  app.use(
    cors({
      origin: "https://mern-thinkboard-production-ec52.up.railway.app/",
    }),
  );
}

// TODO: disable to save quota, activate when launch
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// not found
app.use(notFound);

// catch all
app.use(errorHandler);

startServer(app, mongoUri, PORT);
