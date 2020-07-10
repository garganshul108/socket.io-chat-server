const makeAddUser = require("./add-user");
const userDb = require("../../__data-access__/user");

const addUser = makeAddUser({ userDb });

module.exports = addUser;
