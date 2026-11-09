import { Server } from "socket.io";
import { handleChatEvents } from "./events/chat.js";
import { handleConnectionEvents } from "./events/connection.js";

export const server = {
  io: null,
};

export const serverStart = (port) => {
  server.io = new Server(port, {
    cors: {
      origin: "*",
    },
  });
  server.io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    handleConnectionEvents(server.io, socket);
    handleChatEvents(server.io, socket);
  });
};
