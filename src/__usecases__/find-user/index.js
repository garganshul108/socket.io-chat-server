const makeFindUser = require("./find-user");

const userDb = require("../../__data-access__/user");

const findUser = makeFindUser({ userDb });

module.exports = findUser;
