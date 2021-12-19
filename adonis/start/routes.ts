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

import Route from "@ioc:Adonis/Core/Route";
import Chatroom from "App/Models/Chatroom";
import User from "App/Models/User";
import UsersChatroom from "App/Models/UsersChatroom";
import Hash from "@ioc:Adonis/Core/Hash";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.post("/auth/login", "AuthController.login");
Route.post("/auth/register", "AuthController.register");
Route.post("/auth/logout", "AuthController.logout");

Route.get("/new-user", async ({ auth }) => {
  const user = new User();
  user.username = "user1";

  //make hashed password
  const hashedPassword = await Hash.make("secret");
  user.password = hashedPassword;
  user.firstName = "Austin";
  user.lastName = "Mayer";
  const savedUser = await user.save();

  return { res: 200, savedUser };
});

Route.get("/new-chatroom", async () => {
  const chatroom = new Chatroom();
  chatroom.roomName = "Room 1";
  const savedChatroom = await chatroom.save();

  const userschatroom = new UsersChatroom();
  const user = await User.find(4);
  if (user && savedChatroom) {
    userschatroom.userId = user.id;
    userschatroom.chatroomId = chatroom.id;
    await userschatroom.save();
    return {
      result: 200,
      userschatroom,
      user,
      chatroom,
    };
  }
  return {
    result: 400,
  };
});

Route.get("/all-users", async ({ auth }) => {
  const user = await User.query()
    .preload("userChatroom")
    .preload("messages")
    .first();

  let results: any = null;

  if (user) {
    results = await auth.use("api").attempt(user.username, "secret");
  }

  return { user, results };
});
