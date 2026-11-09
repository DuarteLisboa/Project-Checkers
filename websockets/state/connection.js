// Logged in users, by socket id. One user can have several sockets (browser tabs).
const users = new Map();

export const addUser = (socketId, user) => {
  users.set(socketId, { id: user.id, name: user.name });
};

export const removeUser = (socketId) => {
  users.delete(socketId);
};

export const getUser = (socketId) => users.get(socketId);

export const getUsers = () => {
  const uniqueUsers = new Map();
  users.forEach((user) => uniqueUsers.set(user.id, user));
  return [...uniqueUsers.values()];
};

export const isOnline = (userId) => {
  return [...users.values()].some((user) => user.id === userId);
};
