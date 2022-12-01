module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("websockets working");
    socket.on("sendMessage", (messageInfo) => {
      messageInfo.me = false;
      socket.broadcast.emit("receiveMessage", messageInfo);
    });
  });
};
