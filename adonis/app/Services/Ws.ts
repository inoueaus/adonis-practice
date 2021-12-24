import { Server } from "socket.io";
import AdonisServer from "@ioc:Adonis/Core/Server";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import Env from "@ioc:Adonis/Core/Env";
import Logger from "@ioc:Adonis/Core/Logger";

class Ws {
  public io: Server;
  private booted = false;
  public pubClient;
  public subClient;

  public async boot() {
    //ignore multiple boot calls by checking this.booted
    if (this.booted) {
      return;
    }

    const FRONT_DOMAIN = Env.get("FRONT_DOMAIN");
    this.booted = true;
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: FRONT_DOMAIN,
        methods: ["GET", "POST"],
        allowedHeaders: ["token", "userId", "chatroomId"],
        credentials: true,
      },
      transports: ["websocket"],
      path: "/socket.io"
    });

    const redisHost = Env.get("REDIS_HOST");
    const redisPort = Env.get("REDIS_PORT");

    this.pubClient = createClient({ url: `redis://${redisHost}:${redisPort}` });
    this.subClient = this.pubClient.duplicate();

    this.pubClient.on("error", (err) => {
      console.log(err);
    });
    Promise.all([this.pubClient.connect(), this.subClient.connect()]).then(
      () => {
        this.io.adapter(createAdapter(this.pubClient, this.subClient));
        (async () => {
          await this.subClient.subscribe("channel", (message) => {
            Logger.info(`Redis test ver 1.0.1: ${message}`);
          });
          await this.pubClient.publish("channel", "Hello");
          await this.pubClient.publish("channel", "World!");
        })();
      }
    );
  }
}

export default new Ws();
