const makeRoom = require("../../room");

const makeAddMemberToRoom = ({ roomDb, userDb }) => {
  const addMemberToRoom = async ({ admin, member, roomId }) => {
    if (!admin || !member || !roomId) {
      throw new Error("Admin, Member or RoomId missing");
    }

    const existingRoom = await roomDb.findByTitle({ title: roomId });
    if (!existingRoom) {
      throw new Error(`No Room as ${roomId} exists.`);
    }

    const room = makeRoom({ ...existingRoom });
    room.addMember({ admin, user: member });
    await roomDb.addMemberToRoom({ member, title: roomId });
    return {
      ok: true,
      message: `Member added successfully.`,
      data: {
        ...member,
      },
    };
  };

  return addMemberToRoom;
};
module.exports = makeAddMemberToRoom;
