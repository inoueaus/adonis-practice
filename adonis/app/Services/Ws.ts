import { Server } from "socket.io";
import AdonisServer from "@ioc:Adonis/Core/Server";

class Ws {
  public io: Server;
  private booted = false;

  public boot() {
    //ignore multiple boot calls by checking this.booted
    if (this.booted) {
      return;
    }

    this.booted = true;
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["token"],
        credentials: true,
      },
    });
  }
}

export default new Ws();
