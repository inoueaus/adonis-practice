/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Route from "@ioc:Adonis/Core/Route";
import Chatroom from "App/Models/Chatroom";
import User from "App/Models/User";
import UsersChatroom from "App/Models/UsersChatroom";
import Logger from "@ioc:Adonis/Core/Logger";

Route.get("/", async (ctx: HttpContextContract) => {
  const cookies = ctx.request.cookiesList();
  console.log(cookies);
  Logger.info((await JSON.stringify(cookies)));
  return { hello: "world" };
});

Route.post("/auth/login", "AuthController.login");
Route.post("/auth/register", "AuthController.register");
Route.post("/auth/logout", "AuthController.logout");

//group requiring authentication middleware
Route.group(() => {
  Route.post("/join-chatroom", async (ctx: HttpContextContract) => {
    //extract chatroomname from request
    const body = await ctx.request.body();
    const chatroomName = body.chatroomName as string;
    const userId = body.userId as number;

    //validate
    const userExists = await User.find(userId);
    if (userExists) {
      //check if chatroom with name exists
      const chatroomExists = await Chatroom.findBy("room_name", chatroomName);

      if (chatroomExists) {
        return ctx.response.json(chatroomExists);
      }
      //create chatroom if doesnt exist
      const newChatroom = new Chatroom();
      newChatroom.roomName = chatroomName;
      const savedChatroom = await newChatroom.save();
      if (savedChatroom) {
        //create new link between chatroom and user
        const newUsersChatroomsLink = new UsersChatroom();
        newUsersChatroomsLink.userId = userExists.id;
        newUsersChatroomsLink.chatroomId = savedChatroom.id;
        await newUsersChatroomsLink.save();
        return ctx.response.json(savedChatroom);
      }
    }
    return ctx.response.unauthorized();
  });
}).middleware("auth:api");
