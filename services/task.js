// Model's Import
let TaskModel = require("../models/tasks");

let createTask = async function (data) {
  let task = null;
  try {
    task = await new TaskModel(data).save();
  } catch (err) {
    console.log(err);
  }
  return task;
};

let findTaskbyAdmin = async function () {
  let tasks = null;
  try {
    tasks = await TaskModel.find({});
  } catch (err) {
    console.log(err);
  }
  return tasks;
};

let findtask = async function (data) {
  let tasks = null;  
  try {
    tasks = await TaskModel.find({assignto: data.email}); 
  } catch (err) {
    console.log(err);
  }
  return tasks;
};


module.exports = {
  CreateTask: createTask,
  findTaskbyAdmin: findTaskbyAdmin,
  findTask: findtask,
};
