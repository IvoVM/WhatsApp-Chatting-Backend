module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (player1, player2) => {
      socket.on("sendMessage", (messageInfo) => {
        messageInfo.me = false;
        socket.broadcast.emit("receiveMessage", messageInfo);
      });
    });
  });
};
