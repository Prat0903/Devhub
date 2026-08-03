let express = require("express");
let cookieParser = require("cookie-parser");

let authRoutes = require("./routes/auth.routes");
let profileRoutes = require("./routes/profile.routes");
let projectRoutes = require("./routes/project.routes");
let blogRoutes = require("./routes/blog.routes");
const errorMiddleware = require("./middleware/error.middleware");

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorMiddleware);

module.exports = app;
