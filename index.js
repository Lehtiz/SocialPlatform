const io = require('socket.io')(8900, {
  cors:{
    origin: "http://localhost:3000"
  },
});

// array with users userId and their associated socketId
let users = [];

// when a new user connects add their userId and socketId to users array which can inform other connected users of their presence
const addUser = (userId, socketId) =>{
  // check if user already has a socket
  !users.some(user => user.userId === userId) &&
  users.push({userId, socketId});
}
// on disconnect remove user from users array
const removeUser = (socketId) =>{
  // filter and ignore any user whose socketId is not the one provided, essentially removing the user with the provided scoketId
  users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
  // find user with userId from users
  return users.find(user => user.userId === userId);
}

// creates a socket connection
io.on("connection", (socket) => {
  
  // on connect
  console.log('a user connected ', socket.id);
  // take userId and SocketId from users
  socket.on('addUser', userId=>{
    // add user
    addUser(userId, socket.id);
    // send _all clients_(emit) the updated array
    io.emit('getUsers', users);
  });

  // on disconnect
  socket.on('disconnect', () =>{
    // remove disconnected user
    removeUser(socket.id);
    // send _all clients_(emit) the updated array
    io.emit('getUsers', users);
    console.log('a user disconnected ', socket.id);
  });

  // send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    // get user who this message is going to with userId
    const receiver = getUser(receiverId);
    // send to user new message
    io.to(receiver.socketId).emit('getMessage', {
      senderId,
      text
    });
  });

});
