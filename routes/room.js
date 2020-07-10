const router = require("express").Router();
const makeExpressCallback = require("../express-callback");
const { postRoom, getRoom } = require("../src/__controllers__");

// router.post("/", (req, res) => {
//   res.send("Room [Post] hit.");
// });
router.post("/", makeExpressCallback(postRoom));

// router.get("/", (req, res) => {
//   res.send("Room [Get] hit.");
// });
router.get("/", makeExpressCallback(getRoom));

router.delete("/", (req, res) => {
  res.status(404).send("Action Doesn't exists.");
});

module.exports = router;
