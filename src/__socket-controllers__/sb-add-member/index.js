const makeSBAddMember = require("./sb-add-member");
const addMember = require("../../__usecases__/add-member-to-room");

const SBAddMember = makeSBAddMember({ addMember });

module.exports = SBAddMember;
