const makeDb = require("../../../db");
const makeUserDb = require("./user-db");

const userDb = makeUserDb({ makeDb });

module.exports = userDb;
