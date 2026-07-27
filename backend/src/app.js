let express = require("express");
let cookieParser = require("cookie-parser");

let authRoutes = require("./routes/auth.routes");
let profileRoutes = require("./routes/profile.routes");
const errorMiddleware = require("./middleware/error.middleware");

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);

app.use(errorMiddleware);

module.exports = app;
