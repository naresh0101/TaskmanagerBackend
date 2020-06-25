const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");

const TASK_DONE = true,
  TASK_PENDING = false

const TASK_LIKE = true,
TASK_DISLIKE = false;

const taskSchema = new mongoose.Schema(
  {
    tasktitle: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    assignby: {
      type: String,
      required: true,
    },
    assignto: {
      type: String,
      required: true,
    },
    describe: {
      type: String,
      trim: true,
      minlength: 5,
      required: true,
    },
    project: {
      type: String,
    },
    status: {
      type: String,
      default: TASK_PENDING ,
      enum: [TASK_DONE, TASK_PENDING],
    },
    like: {
      type: String,
      required: TASK_DISLIKE,
      enum: [TASK_LIKE, TASK_DISLIKE],
    },
  },
  { collection: "tasks" }
);

taskSchema.statics.TASK_DISLIKE = TASK_DISLIKE;
taskSchema.statics.TASK_LIKE = TASK_LIKE;
taskSchema.statics.TASK_DONE = TASK_DONE;
taskSchema.statics.TASK_PENDING = TASK_PENDING;

taskSchema.plugin(mongooseBcrypt);
taskSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("Task", taskSchema);
