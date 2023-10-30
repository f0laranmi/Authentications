const router = require("express").Router();

const { register, login, login2 } = require("../controllers/auth");

router.post("/signup", register);
router.post("/signin", login);
router.post("/login", login2)
module.exports = router;