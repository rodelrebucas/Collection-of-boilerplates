import { Client, Room } from './location.model';

const client = Client();
const room = Room();
/**
 * @socket {get} get location
 * @apiDescription location socket path
 */
export default io => ((socketIO) => {
  const publicChannel = socketIO.of('/public');
  publicChannel.on('connection', (socket) => {
    // publicChannel.removeAllListeners();

    /** Emit to namespace */
    // publicNamespace.emit('  user', `Namespace User ${user.name} has connected`);

    /** Listen for user location */
    socket.on('emit-location', (data) => {
      const { location } = data;
      const newClient = client.save(socket.client.id, location);
      if (newClient) {
        // Emit the location except to sender
        socket.broadcast.emit('add-location', { location: newClient.location });
        // Emit on this connection only
        // Emit saved locations
        socket.emit('locations', { locations: client.findAllClientLocation(socket.client.id) });
      }
    });

    /** Create a room */
    socket.on('create-room', () => {
      const createdRoom = room.save(socket.client.id);
      if (createdRoom) {
        socket.join(socket.client.id);
        socket.emit('room-created', { room: createdRoom.id });
      }
    });

    socket.on('join-room', (data) => {
      // check if client is already connected to a room: if so leave room
      // check room if exist
      // emit the available locations
      // socket.to(data.room).emit('locations', data.location);
      // socket.to(data.room).emit('locations', <saved-locations>)
      // return error
      // Do nothing if client is joining its own room
      if (data.room !== socket.client.id) {
        const [joinedRoom, existingRoom, clientLocation] = room.joinRoom(
          data.room,
          socket.client.id,
        );
        if (joinedRoom && clientLocation) {
          socket.join(joinedRoom);
          socket.emit('room-joined', {
            room: joinedRoom,
            locations: room.findRoomLocation(joinedRoom, socket.client.id),
          });
          socket.to(data.room).emit('add-room-location', {
            location: clientLocation,
          });
        }
        if (existingRoom) socket.to(data.room).emit('remove-location', { location: clientLocation });
      }
    });

    socket.on('emit-location-on-room', (data) => {
      socket
        .to(data.room)
        .emit('add-room-location', { location: `${data.location.lat} ${data.location.lng}` });
    });

    /** Disconnected socket */
    socket.on('disconnect', () => {
      // client disconnected notify clients here
      // or update their view when a client disconnects
      const deletedClient = client.delete(`${socket.client.id}`);
      if (deletedClient) {
        room.leaveRoom(deletedClient);
        socket.broadcast.emit('remove-location', { location: deletedClient.location });
      }
    });
  });
})(io);
