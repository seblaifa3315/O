const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const { join } = require("path");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const diverRouter = require("./routes/diver");

dotenv.config();
const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/diver", diverRouter);

module.exports = { app, server };