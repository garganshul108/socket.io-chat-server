const makeRoomDb = ({ makeDb }) => {
  const findAll = async () => {
    LOG.core("DATAACCESS: findAll Called");

    const db = await makeDb();
    const result = await db.collection("room").find({});
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { ...info } = found;
    return info;
  };
  const findByTitle = async ({ title }) => {
    LOG.core("DATAACCESS: findByTitle Called");

    const db = await makeDb();
    const result = await db.collection("room").findOne({ title });
    // console.log(result);
    if (!result) return null;
    LOG.core(result);
    const info = { ...result };
    return info;
  };
  const remove = async () => {
    LOG.core("DATAACCESS: remove Called");

    throw new Error("DATA-ACCESS: Not implemented");
  };
  const update = async () => {
    LOG.core("DATAACCESS: update Called");

    throw new Error("DATA-ACCESS: Not implemented");
  };
  const insert = async (incoming) => {
    LOG.core("DATAACCESS: insert Called");

    const db = await makeDb();
    const result = await db.collection("room").insertOne({
      ...incoming,
    });
    const { ...info } = result.ops[0];
    return info;
  };

  return Object.freeze({
    findAll,
    findByTitle,
    insert,
    remove,
    update,
  });
};

module.exports = makeRoomDb;
