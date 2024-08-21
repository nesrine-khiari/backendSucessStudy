export { };
const socketio = require('socket.io');

exports.setup = (server: any) => {
  socketio(server).on('connect', (client: any) => {
    console.log('--- socket.io connection ready');
    client.on("join", (roomId: any) => {
      client.join(roomId);
    });
    client.on("sendMessage", (res: any) => {
      client.to(res.roomId).emit("message", res.message);
    });
    

      


    client.on('customMessage', (msg: any) => {
      console.log('on message - ', msg);

      client.emit('customReply', { test: 789 });
    });
  });
};
