import { getUser, isOnline } from "../state/connection.js";
import { userRoom } from "./connection.js";

export const handleChatEvents = (io, socket) => {
  socket.on("chat-message", (message) => {
    const { to, text } = message ?? {};
    const from = getUser(socket.id);
    if (!from || !isOnline(to)) return;
    if (typeof text !== "string" || !text.trim()) return;

    // Sent to both users, so all the tabs of the sender also get the message
    io.to([userRoom(to), userRoom(from.id)]).emit("chat-message", {
      from,
      to,
      text,
      sentAt: new Date().toISOString(),
    });
  });
};
