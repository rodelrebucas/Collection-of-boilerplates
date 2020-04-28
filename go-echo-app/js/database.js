import loki from 'lokijs';

const LokiDb = (() => {
  let db;
  let roomCol;
  let clientCol;

  const initDb = () => {
    // eslint-disable-next-line new-cap
    db = new loki('onlooker');
    roomCol = db.addCollection('room');
    clientCol = db.addCollection('client');
    return { roomCol, clientCol };
  };

  return {
    getCollection: () => {
      if (!roomCol && !clientCol) {
        return initDb();
      }
      return { roomCol, clientCol };
    },
  };
})();

export default LokiDb;
