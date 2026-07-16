require("dotenv").config();

let app = require("./src/app");
const connectDb = require("./src/config/database");

let port = process.env.PORT;

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
