const { postSignup } = require("../src/__controllers__");
const makeExpressCallback = require("../express-callback");
const router = require("express").Router();

// router.post("/", (req, res) => {
//   console.log(req.body);
//   res.status(201).send("Signup Post Called.");
// });

router.post("/", makeExpressCallback(postSignup));

module.exports = router;
