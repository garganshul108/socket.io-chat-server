const config = require("config");
const mongodb = require("mongodb");

const dbName = config.get("db-name");
const user = config.get("db-user");
const secret = config.get("db-password");
const dbConnectionString = `mongodb+srv://${user}:${secret}@socket-io-chat-db.evfw7.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const MongoClient = mongodb.MongoClient;
const url = dbConnectionString;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const makeDb = async () => {
  if (!client.isConnected()) {
    await client.connect();
    LOG.db("DB Connection established.");
  }
  return client.db(dbName);
};

module.exports = makeDb;
