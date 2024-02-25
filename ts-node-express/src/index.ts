import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  socket.on('add', (data) => {
    console.log('add from: ', socket.id);
    socket.broadcast.emit('new-add', data);
  });

  socket.on('edit', (data) => {
    socket.broadcast.emit('new-edit', data);
  });

  socket.on('delete', (data) => {
    socket.broadcast.emit('new-delete', data);
  });

  socket.on('mouse_pos', (data) => {
    console.log('mouse_pos from: ', socket.id);
    socket.broadcast.emit('new_mouse_pos', data);
  });

  socket.emit('id', socket.id);
});

io.listen(3000);
