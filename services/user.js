// Module's Import
const uuidApiKey = require("uuid-apikey");

// Model's Import
let UserModel = require("../models/user")

let createUser = async function (data) {
  let user = null;
  // CREATE API Key
  data.api_key = uuidApiKey.create().apiKey;
  try {
    user = await new UserModel(data).save();
  } catch (err) {
    // TODO: Use any debug library or use custom one
    console.log(err);
  }
  return user;
};


let deleteUser = async function (user) {
  let success = true;
  try {
    await UserModel.deleteOne({ _id: user._id });
  } catch (err) {
    success = false;
  }
  return success;
};

module.exports = {
  CreateUser: createUser,
  DeleteUser: deleteUser,
};
