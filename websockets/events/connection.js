import { addUser, getUser, getUsers, removeUser } from "../state/connection.js";

// Only logged in sockets get the list of online users
const LOGGED_IN_ROOM = "logged-in";

export const userRoom = (userId) => `user:${userId}`;

const isValidUser = (user) => {
  return Number.isInteger(user?.id) && typeof user.name === "string";
};

export const handleConnectionEvents = (io, socket) => {
  const emitUsers = () => {
    io.to(LOGGED_IN_ROOM).emit("users", getUsers());
  };

  const removeCurrentUser = () => {
    const user = getUser(socket.id);
    if (!user) return;

    socket.leave(userRoom(user.id));
    socket.leave(LOGGED_IN_ROOM);
    removeUser(socket.id);
    emitUsers();
  };

  socket.on("echo", (msg) => {
    socket.emit("echo", msg);
  });

  socket.on("login", (user) => {
    if (!isValidUser(user)) return;

    removeCurrentUser();
    addUser(socket.id, user);
    socket.join(userRoom(user.id));
    socket.join(LOGGED_IN_ROOM);
    emitUsers();
    console.log(`User logged in: ${user.name} (${socket.id})`);
  });

  socket.on("logout", removeCurrentUser);
  socket.on("disconnect", removeCurrentUser);
};
