const Models = require("../models"),
  taskService = require("../services/task"),
  userService = require("../services/user"),
  Joi = require("@hapi/joi");

class TaskController {
  constructor() {}

    async assignTask(req, res, next) {
      let reqBody = req.body,
        resBody = { success: false }; 
        reqBody.like = false
        // Input body validation
      let inputSchema = Joi.object({
        tasktitle: Joi.string().min(5).max(100).required(),
        assignby: Joi.string().required(),
        assignto: Joi.string().required(),
        describe: Joi.string().min(5).required(),
        project: Joi.string(),
        status: Joi.string()
          .valid(Models.Task.TASK_DONE, Models.Task.TASK_PENDING),
        like: Joi.string()
          .required()
          .valid(Models.Task.TASK_LIKE, Models.Task.TASK_DISLIKE),
      });
      const newtask = {
        tasktitle: reqBody.tasktitle,
        assignby: res.user.email,
        describe: reqBody.describe,
        project: reqBody.project,
        status: reqBody.status,
        like:reqBody.like,
        assignto : reqBody.assignto
      };
      try {
        await inputSchema.validateAsync(newtask);        
      } catch (err) {
        resBody.message = err.message.replace(/\"/g, "");
        return res.status(200).json(resBody);
      }
      await taskService.CreateTask(newtask);
      resBody.success = true;
      resBody.message = "Task assigned Successfully";
      res.status(200).json(resBody);
    }

    async fetchtask(req, res, next) {
      let resBody = { success: false },
      reqBody = req.body      
      switch (res.user.usertype) {
        case 'admin':
            try {
              const tasks = await taskService.findTaskbyAdmin();
              resBody.success = true;
              resBody.data = tasks;
              res.status(200).json(resBody);
            } catch (err) {
              resBody.message = err.message.replace(/\"/g, "");
              return res.status(200).json(resBody);
            }
          break;
        default:
          try {
            const tasks = await taskService.findTask(res.user);
            resBody.success = true;
            resBody.data = tasks;
            res.status(200).json(resBody);
          } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
          }
          break;
      }
    }
  async deleteById(req, res, next) {
    let resBody = { success: false },
      reqBody = req.body   
    resBody.success = true;
    resBody.data = tasks;
    res.status(200).json(resBody);
      
  }
}

module.exports = new TaskController();
