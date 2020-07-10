const makeGetRoom = require("./get-room");
const makePostLogin = require("./post-login");
const makePostSignup = require("./post-signup");
const makePostRoom = require("./post-room");

const findRoom = require("../__usecases__/find-room");
const verifyUser = require("../__usecases__/verify-user");
const addUser = require("../__usecases__/add-user");
const addRoom = require("../__usecases__/add-room");

const getRoom = makeGetRoom({ findRoom });
const postLogin = makePostLogin({ verifyUser });
const postSignup = makePostSignup({ addUser });
const postRoom = makePostRoom({ addRoom });

module.exports = {
  getRoom,
  postLogin,
  postSignup,
  postRoom,
};
