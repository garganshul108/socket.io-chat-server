const makeGetRoom = ({ findRoom }) => {
  const getRoom = async (httpRequest) => {
    LOG.core("CONTROLLER: getRoom Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object

      const title = httpRequest.params.title;
      const fetched = await findRoom({ title });
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date().toUTCString(),
        },
        statusCode: 200,
        body: { fetched },
      };
    } catch (err) {
      console.log(err);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
  return getRoom;
};

module.exports = makeGetRoom;
