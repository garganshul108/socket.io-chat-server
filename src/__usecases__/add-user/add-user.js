const makeAddUser = ({ userDb }) => {
  const addUser = async ({ username, password }) => {
    LOG.core("USECASE: addUser called");
    if (!username || !password) {
      throw new Error("Username and Password need to be provided.");
    }

    const existing = await userDb.findByUsername({ username });
    // console.log(existing);
    if (existing) {
      return {
        ok: false,
        message: `Username already exists.`,
      };
    }

    const inserted = await userDb.insert({ username, password });

    return {
      ok: true,
      message: "User added successfully.",
      data: inserted,
    };
  };

  return addUser;
};

module.exports = makeAddUser;
