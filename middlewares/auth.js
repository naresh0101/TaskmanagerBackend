const Models = require("../models");


class AuthMiddleware {
  constructor() {}

  async apiKeyAuth(ctx, next) {
    let resBody = { success: false };
    
  }
}

module.exports = new AuthMiddleware();