const makeAddRoom = ({ roomDb, userDb }) => {
  const addRoom = async ({ title, admin }) => {
    LOG.core("USECASE: addRoom called");
    if (!title) {
      throw new Error("Title for the room must be provided.");
    }

    if (!admin) {
      throw new Error("Admin must be provided.");
    }

    const existingRoom = await roomDb.findByTitle({ title });

    const existingAdmin = await userDb.findByUsername({ username: admin });

    if (existingRoom) {
      throw new Error(`Room with title as '${title}' already exists.`);
    }

    if (!existingAdmin) {
      throw new Error(`No registered user with username as '${admin}' exists.`);
    }

    const inserted = await roomDb.insert({
      title,
      admins: [admin],
      members: [admin],
      messages: [],
    });

    return {
      ok: true,
      message: `Room Created.`,
      data: inserted,
    };
  };

  return addRoom;
};

module.exports = makeAddRoom;
