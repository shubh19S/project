const express = require("express");
const app = express();
require('./utils/sendResponse')(app)

const dotenv = require("dotenv");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { authRateLimiter, apiRateLimiter } = require("./middleware/ratelimiter");

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';


app.use(express.json())

// Routes

if (NODE_ENV === "production") {
  app.use(apiRateLimiter);
  app.use("/api/v1/user", authRateLimiter);
}
app.use("/api/v1/user", userRoutes);


db.sync()
  .then((result) => console.log("sync success"))
  .catch((err) => console.log("sync error ", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});