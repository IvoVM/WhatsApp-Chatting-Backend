const usersOnline = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    
    //Update usersList
    const updateUsersList = () => {
      socket.emit("updateUsersList", usersOnline);
    };

    // User Loged In
    socket.on("newLogedUser", (username) => {
      if (usersOnline.indexOf(username) == -1) {
        //That user is a new one
        usersOnline.push(username);
        socket.nickname = username;
        updateUsersList();
        console.log(usersOnline);
      } else {
        return;
      }
    });

    // socket.on("joinRoom", ({ usermame, room }) => {
    //   const usuario = userJoin(socket.id, usermame, room);
    //   socket.join(usuario.room);
    //   //Broadcast to user when he enter the chat room
    //   socket.broadcast
    //     .to(usuario.room)
    //     .emit(
    //       "broadcast",
    //       `Welcome ${usuario.usermame} al room:${usuario.room}`
    //     );
    //   //Send Message
    //   socket.on("sendMessage", (messageInfo) => {
    //     messageInfo.me = false;
    //     socket.broadcast.to(usuario.room).emit("receiveMessage", messageInfo);
    //   });
    // });
    socket.on("sendMessage", (messageInfo) => {
      messageInfo.me = false;
      socket.emit("receiveMessage", messageInfo);
    });

    socket.on("disconnect", () => {
      if (!socket.nickname) return;
      else {
        usersOnline.splice(usersOnline.indexOf(socket.nickname), 1);
        updateUsersList();
      }
    });
  });
};
