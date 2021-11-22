import { io } from './http';

io.on('connection', (socket) => {
  // console.log(`User connected on socket: ${socket.id}`);

  socket.on('welcome-page', () => {
    socket.join('welcome-page');
  });
  
  socket.on('channel', (channelID) => {
    socket.join(`channel-${channelID}`);
  })
})
