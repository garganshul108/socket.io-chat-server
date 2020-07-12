const makeUserDb = ({ makeDb }) => {
  const findAll = async () => {
    LOG.core("DATAACCESS: findAll called");
    const db = await makeDb();
    const result = await db.collection("user").find({});
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { ...info } = found;
    return info;
  };
  const findByUsername = async ({ username }) => {
    LOG.core("DATAACCESS: findByUsername called");
    const db = await makeDb();
    const result = await db.collection("user").findOne({ username });
    // console.log(result);
    if (!result) return null;
    // LOG.core(result);
    const info = { ...result };
    return info;
  };
  const remove = async () => {
    throw new Error("DATA-ACCESS: Not implemented");
  };
  const update = async () => {
    throw new Error("DATA-ACCESS: Not implemented");
  };
  const insert = async (incoming) => {
    LOG.core("DATAACCESS: insert called");
    const db = await makeDb();
    const result = await db.collection("user").insertOne({
      ...incoming,
    });
    const { password, _id, ...info } = result.ops[0];
    return info;
  };

  return Object.freeze({
    findAll,
    findByUsername,
    insert,
    remove,
    update,
  });
};

module.exports = makeUserDb;
