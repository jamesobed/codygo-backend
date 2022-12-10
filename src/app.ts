import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
// import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import logger from "morgan";
import listingsRouter from "./routes/listings";
import brandsRouter from "./routes/brand";
import db from "./config/databaseConfig";

db.sync({
  // force: true,
})
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel API");
});
app.use("/hotels", listingsRouter);
app.use("/brand", brandsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
