const Models = require("../models"),
  taskService = require("../services/task"),
  userService = require("../services/user"),
  Joi = require("@hapi/joi");

class TaskController {
  constructor() {}

    async assignTask(req, res, next) {
      let reqBody = req.body,
        resBody = { success: false };
      // Input body validation
      let inputSchema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        assignby: Joi.string().required(),
        assignto: Joi.string().required(),
        describe: Joi.string().min(5).required(),
        project: Joi.string(),
        status: Joi.string()
          .required()
          .valid(Models.Task.TASK_DONE, Models.Task.TASK_PENDING),
        like: Joi.string()
          .required()
          .valid(Models.Task.TASK_LIKE, Models.Task.TASK_DISLIKE),
      });
      const newtask = {
        title: reqBody.title,
        assignby: reqBody.assignby,
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
            const tasks = await taskService.findtask(res.user);
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
}

module.exports = new TaskController();
