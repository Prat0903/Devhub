require("dotenv").config();

let app = require("./src/app");

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
