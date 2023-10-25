const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter=require("./routes/auth")
const notesRouter=require("./routes/notes")
const app = express();

dotenv.config();

//add middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

//mongo db connection

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth",authRouter)
app.use("/api/notes",notesRouter)

app.listen(8000, () => {
  console.log("app is running on PORT " + 8000);
});
