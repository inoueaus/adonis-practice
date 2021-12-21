import Hash from "@ioc:Adonis/Core/Hash";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    //process request body and extract submitted password and username
    const body = await ctx.request.body();

    const username = body.username;
    const password = body.password;

    const user = await User.findBy("username", username);

    if (user) {
      const authResults = await ctx.auth
        .use("api")
        .attempt(user.username, password);

      if (authResults) {
        await user.load("usersChatroom");

        return ctx.response.status(200).json({
          userId: user.id,
          username: user.username,
          chatrooms: user.usersChatroom,
          token: authResults.token,
        });
      }
    }

    return ctx.response.json({});
  }

  public async register(ctx: HttpContextContract) {
    //process request body and extract submitted password and username
    const body = await ctx.request.body();

    const username = body.username;
    const password = body.password;

    //check if usename and password were in body
    if (username && password) {
      //must add validation here
      const newUser = new User();
      newUser.username = username;
      const hashedPassword = await Hash.make(password);
      newUser.password = hashedPassword;

      //register user and retrieve userId
      const savedUser = await newUser.save();

      if (savedUser) {
        //authorize to log a token in database
        const authResults = await ctx.auth
          .use("api")
          .attempt(savedUser.username, password);

        return ctx.response.safeStatus(200).json({
          username: savedUser.username,
          userId: savedUser.id,
          token: authResults.token,
        });
      }
      return ctx.response.badRequest({ error: "Username was already used" });
    }
    return ctx.response.badRequest({
      error: "Username or Password was absent",
    });
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.use("api").revoke();
    console.log(ctx.request);

    return ctx.response.json({ revoked: true });
  }

  //public async changePassword(ctx: HttpContextContract) {}
}
