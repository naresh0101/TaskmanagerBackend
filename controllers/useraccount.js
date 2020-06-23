const Models = require("../models");
const Joi = require("@hapi/joi");


class UserAccountController {
  constructor() {}

    async createAccountAndUser(req, res, next) {
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
    }

}

module.exports = new UserAccountController()

