const makePostRoom = ({ addRoom }) => {
  const postRoom = async (httpRequest) => {
    LOG.core("CONTROLLER: postRoom Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object

      const title = httpRequest.body.title;
      const admin = httpRequest.body.admin;
      const posted = await addRoom({ title, admin });
      if (posted.ok) {
        return {
          headers: {
            "Content-Type": "application/json",
            "Last-Modified": new Date().toUTCString(),
          },
          statusCode: 201,
          body: { ...posted },
        };
      } else {
        return {
          headers: {
            "Content-Type": "application/json",
            "Last-Modified": new Date().toUTCString(),
          },
          statusCode: posted.statusCode || 400,
          body: { ...posted },
        };
      }
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
  return postRoom;
};

module.exports = makePostRoom;
