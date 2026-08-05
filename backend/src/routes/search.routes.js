let express = require("express");
const { searchController } = require("../controllers/search.controller");

let router = express.Router();

router.get("/", searchController);

module.exports = router;
