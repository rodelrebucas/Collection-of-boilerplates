/* eslint-disable no-param-reassign */
import LokiDb from './database';

// TODO: when room is already empty delete it from memory
// socket room automatically cleans up itself when no listeners are remained
const { roomCol, clientCol } = LokiDb.getCollection();

const utils = {
  findAll: (collection, filter) => {
    if (filter) {
      const result = collection.where(obj => obj.id !== filter.replace(' ', ''));
      if (result && result.length > 0) return result;
    }
    return null;
  },
  findOne: (id, collection) => {
    if (collection) {
      const result = collection.where(obj => obj.id === id.replace(' ', ''));
      if (result && result.length > 0) return result[0];
    }
    return null;
  },
  update: (data, collection) => {
    collection.update(data);
  },
};

export const Client = () => {
  const findAllClients = id => utils.findAll(clientCol, id);
  return {
    save: (id, location) => clientCol.insert({
      id,
      roomId: null,
      location: `${location.lat} ${location.lng}`,
    }),
    findAllClientLocation: (id) => {
      const clients = findAllClients(id);
      const locations = [];
      if (clients && clients.length > 0) {
        clients.forEach((c) => {
          locations.push(c.location);
        });
      }
      return locations;
    },
    delete: (id) => {
      const client = utils.findOne(id, clientCol);
      if (client) {
        return clientCol.remove(client);
      }
      return null;
    },
  };
};

export const Room = () => {
  const updateClientRoom = (client, roomId) => {
    client.roomId = roomId;
    utils.update(client, clientCol);
  };

  const searchConnectedClients = (id) => {
    let connectedClients = null;
    const room = utils.findOne(id, roomCol);
    if (room) {
      connectedClients = room.clients;
    }
    return connectedClients;
  };

  const extractClientLocation = (data) => {
    // data is in 'id lat lng' format
    const [, lat, lng] = data.split(' ');
    return `${lat} ${lng}`;
  };

  const buildClientLocation = data => `${data.id} ${data.location}`;

  const removeClientFromItsRoom = (client) => {
    const { roomId } = client;
    if (roomId) {
      const room = utils.findOne(roomId, roomCol);
      if (room) {
        const { clients } = room;
        room.clients = clients.filter(l => l !== buildClientLocation(client));
        utils.update(room, roomCol);
        return roomId;
      }
    }
    return null;
  };

  const removeFromRoom = (room, client) => {
    if (room) {
      const clientLocation = buildClientLocation(client);
      room.clients.splice(room.clients.indexOf(clientLocation), 1);
      utils.update(room, roomCol);
    }
  };
  return {
    save: (id) => {
      const client = utils.findOne(id, clientCol);
      const room = utils.findOne(id, roomCol);
      if (room) return room;
      if (client) {
        const newRoom = roomCol.insert({
          id: client.id,
          clients: [buildClientLocation(client)],
        });
        updateClientRoom(client, newRoom.id);
        return newRoom;
      }
      return null;
    },
    joinRoom: (roomId, clientId) => {
      const room = utils.findOne(roomId, roomCol);
      const client = utils.findOne(clientId, clientCol);
      let existingRoomId = null;
      if (room && client) {
        if (room.clients.indexOf(buildClientLocation(client)) < 0) {
          existingRoomId = removeClientFromItsRoom(client);
          updateClientRoom(client, room.id);
          room.clients.push(buildClientLocation(client));
          utils.update(room, roomCol);
          return [room.id, existingRoomId, client.location];
        }
      }
      return [null, null, null];
    },
    findRoomLocation: (roomId, clientId) => {
      const locations = [];
      const clients = searchConnectedClients(roomId);
      const client = utils.findOne(clientId, clientCol);
      if (clients) {
        clients.forEach((c) => {
          locations.push(extractClientLocation(c));
        });
      }
      if (locations && locations.length > 0 && client) locations.splice(locations.indexOf(buildClientLocation(client)), 1);
      return locations;
    },
    leaveRoom: (client) => {
      if (client) {
        const { roomId } = client;
        if (roomId) {
          removeFromRoom(utils.findOne(roomId, roomCol), client);
        }
      }
    },
  };
};
