
//function getHome(request, response){
//   // do any work you need to do, then
//   response.render('home', {title: 'home'});
// }

async function getHome(request, response) {
  try {
    const chatroomsCursor = await request.app.locals.db.collection("rooms").find();
    const chatrooms = await chatroomsCursor.toArray();
    const uniqueChatrooms = [...new Map(chatrooms.map(item => [item['roomName'], item])).values()];
    response.render('home', { title: 'Home', chatrooms: uniqueChatrooms });
  } catch (error) {
    console.error("Error fetching chatrooms:", error);
    response.status(500).send("Internal Server Error");
  }
}





// router.get('/home', async (req, res) => {
//   try {
//       const rooms = await Room.find({}, 'name');
//       const roomNames = rooms.map(room => room.name);
//       console.log('Room Names:', roomNames);
//       // Render the home template with room names as the title
//       res.render('home', { title: 'Home Page', roomNames });
//   } catch (err) {
//       res.status(500).json({ error: err.message });
//   }
// });

// make a new room
async function makeRoom(req, res){
  try {
    const roomName = req.body.roomName || roomHandler.roomIdGenerator();
    const existingRoom = await app.locals.db.collection("chatrooms").findOne({ roomName });
    if (!existingRoom) {
      await app.locals.db.collection("rooms").insertOne({ roomName, messages: [] });
    }
    res.redirect(`/${roomName}`);
  } catch (error) {
    console.error("Error creating chatroom:", error);
    res.status(500).send("Internal Server Error");
  }
}



// get messages for room
async function getMsgRoom (req, res){
  const roomName = req.params.roomName;
  const room = await req.app.locals.db.collection("rooms").findOne({ roomName });
  res.json(room ? room.messages : []);
}


// app.get('/rooms/:_id', async (req, res) => {
//     try {
//       const roomId = req.params._id;
//       console.log('Requested Room Id: ', roomId);

//       const roomMSG = await Room.findById(roomId).populate('messages');
//       if (!roomMSG) {
//         return res.status(404).json({ message: 'Room not found' });
//       }

//       res.json(roomMSG);
//       //accessing the array of messages
//       const messages = roomMSG.messages;
//       //res.json(messages);
//       console.log(messages);

//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
// });


//post messages to a chatroom
async function postToRoom(req, res){
  const roomName = req.params.roomName;
  const { user, content, time } = req.body;
  await app.locals.db.collection("rooms").updateOne(
    { roomName },
    { $push: { messages: { user, content, time } } }
  );
  res.sendStatus(200);
}




module.exports = {
  getHome, makeRoom, getMsgRoom, postToRoom
};