const { postLogin } = require("../src/__controllers__");
const makeExpressCallback = require("../express-callback");
const router = require("express").Router();

// router.post("/", (req, res) => {
//   console.log(req.body);
//   res.status(201).send("Login Hit.");
// });

router.post("/", makeExpressCallback(postLogin));

module.exports = router;
