import socket from 'socket.io';

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

async function createSocketServer({ server }) {
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });
  io.on('connection', (socket) => {
    const { workspaceId } = socket.handshake.query;

    socket.join(workspaceId);

    socket.on(NEW_CHANNEL_MESSAGE, (data) => {
      io.in(workspaceId).emit(NEW_CHANNEL_MESSAGE, data);
    });

    socket.on('disconnect', () => {
      socket.leave(workspaceId);
    });
  });
}

export { createSocketServer };
