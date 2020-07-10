const makeVerifyUser = require("./verify-user");

const userDb = require("../../__data-access__/user");

const verifyUser = makeVerifyUser({ userDb });

module.exports = verifyUser;
