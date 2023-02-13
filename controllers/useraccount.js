const Models = require("../models"),
  UserService = require('../services/user'),
  Joi = require("@hapi/joi");


class UserAccountController {
  constructor() {}

      async createUser(req, res, next) {
        let reqBody = req.body,
          resBody = { success: false };    
        // Input body validation
        let inputSchema = Joi.object({
          name: Joi.string().min(3).max(100).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(8).max(32).required(),
          usertype: Joi.string()
            .required()
            .valid(
              Models.User.TYPE_ADMIN,
              Models.User.TYPE_NORMAL,
              Models.User.TYPE_SDE
            ),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let user = await Models.User.findByEmail(reqBody.email);
        if (user) {
          resBody.message = "Account with email address already exist!!";
          return res.status(200).json(resBody);
        }
        user = await UserService.CreateUser(reqBody);
        resBody.success = true;
        resBody.message = "Account Created Successfully";
        res.status(200).json(resBody);
      }

      async loginAccount(req, res, next) {
        let reqBody = req.body,
          resBody = { success: false };
        let inputSchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let user = await Models.User.findOne({ email: reqBody.email });
        if (!user) {
          resBody.message = "Invalid email provided";
          return res.status(200).json(resBody);
        }
        const isValidPassword = await user.verifyPassword(reqBody.password);
        if (!isValidPassword) {
          resBody.message = "Invalid password provided";
          return res.status(200).json(resBody);
        }

        resBody.success = true;
        resBody.message = "Login successfully";
        resBody = {
          user: user.toJSON(),
          token: user.api_key,
        };
        res.status(200).json(resBody);
      }
      async fetchusers(req, res, next) {
        let reqBody = req.body,
        resBody = { success: false };
        try {
          const users = await UserService.findAllusers();
          resBody.success = true;
          resBody.data = users;
          res.status(200).json(resBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
      }
}

module.exports = new UserAccountController()