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

Route.get("/", async () => {
  return { hello: "world" };
});

Route.get("/new-user", async () => {
  const user = new User();
  user.username = "user1";
  user.password = "secret";
  user.firstName = "Austin";
  user.lastName = "Mayer";
  const result = user.save();
  return { res: 200, result };
});

Route.get("/new-chatroom", async () => {
  const chatroom = new Chatroom();
  chatroom.roomName = "Room 1";
  const savedChatroom = await chatroom.save();
  
  const userschatroom = new UsersChatroom();
  const user = await User.find(1);
  if (user && savedChatroom) {
    userschatroom.userId = user.id;
    userschatroom.chatroomId = chatroom.id;
    await userschatroom.save();
  }
  return {
    userschatroom,
    user,
    chatroom,
  };
});

Route.get("/all-users", async () => {
  const users = await User.query().preload("userChatroom").preload("messages");

  return { users };
});
