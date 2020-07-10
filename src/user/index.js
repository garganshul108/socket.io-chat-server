const buildMakeUser = require("./user");

const textSanitizer = (text) => text;
const makeUser = buildMakeUser({ textSanitizer });

module.exports = makeUser;
