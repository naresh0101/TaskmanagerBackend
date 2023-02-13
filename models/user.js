const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const validator = require("validator");
const uuidApiKey = require("uuid-apikey");

const TYPE_ADMIN = "admin",
  TYPE_SDE = "sde",
  TYPE_NORMAL = "normal";
const STATUS_ACTIVE = "active",
  STATUS_PENDING = "pending",
  STATUS_DELETED = "deleted",
  STATUS_DISABLED = "disabled";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    profile: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate: function (value) {
        return validator.isEmail(value);
      },
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    usertype: {
      type: String,
      required: true,
      enum: [TYPE_ADMIN, TYPE_SDE, TYPE_NORMAL],
    },
    api_key: {
      type: String,
      required: true,
      unique: true,
      default: uuidApiKey.create().apiKey,
    },
    status: {
      type: String,
      required: true,
      enum: [STATUS_ACTIVE, STATUS_PENDING, STATUS_DISABLED, STATUS_DELETED],
      default: STATUS_PENDING,
    },
  },
  { collection: "users" }
);
// Static Method's
userSchema.statics.findByEmail = async function (email) {
  let user = await this.findOne({ email: email });
  return user;
};

userSchema.statics.TYPE_ADMIN = TYPE_ADMIN;
userSchema.statics.TYPE_NORMAL = TYPE_NORMAL;
userSchema.statics.TYPE_SDE = TYPE_SDE;
userSchema.statics.STATUS_ACTIVE = STATUS_ACTIVE;
userSchema.statics.STATUS_PENDING = STATUS_PENDING;
userSchema.statics.STATUS_DELETED = STATUS_DELETED;
userSchema.statics.STATUS_DISABLED = STATUS_DISABLED;


userSchema.plugin(mongooseBcrypt);
userSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("User", userSchema);
