// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
  response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
}

module.exports = {
  getRoom,
  roomIdGenerator: roomGenerator.roomIdGenerator
};

// //get all rooms
// app.get('/rooms', async (req, res) => {
//     try {
//         const rooms = await Room.find({}, 'name');
//         res.json(rooms);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });