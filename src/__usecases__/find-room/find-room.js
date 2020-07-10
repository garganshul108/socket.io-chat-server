const makeFindRoom = ({ roomDb }) => {
  const findRoom = async ({ title }) => {
    LOG.core("USECASE: findRoom called");

    if (!title) {
      throw new Error("Title for the room must be provided.");
    }

    const existingRoom = await roomDb.findByTitle({ title });

    if (!existingRoom) {
      return {
        ok: false,
        message: `No room with ${title} exists.`,
      };
    }

    return {
      ok: true,
      message: `Room Exists.`,
      data: existingRoom,
    };
  };

  return findRoom;
};

module.exports = makeFindRoom;
