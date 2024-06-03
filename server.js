const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const { MongoClient } = require('mongodb');

// Import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = process.env.PORT || 8080;
// const port = 8080;

// MongoDB connection setup
const uri = "mongodb+srv://kelseymoose346:tHxHoUgQvFSJOXTu@lab7.dacytz2.mongodb.net/lab7?retryWrites=true&w=majority&appName=lab7";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("chatroomDB");
    app.locals.db = db;
    console.log("Connected to MongoDB");

    const collection = await db.listCollections().toArray();
    if (!collection.map((coll) => coll.name).includes("rooms")) {
      await db.createCollection("rooms");
    }

    // Start the server after the database connection is established
    //app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

connectToDatabase();

//GIVEN CODE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
//MIGHT NEED .ENGINE
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//GIVEN CODE

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);
app.post('/create', homeHandler.makeRoom);
app.get('/:roomName/messages', homeHandler.getMsgRoom);
app.post('/:roomName/messages', homeHandler.postToRoom);


// // make a new room
// app.post('/create', async (req, res) => {
//   try {
//     const roomName = req.body.roomName || roomHandler.roomIdGenerator();
//     const existingRoom = await app.locals.db.collection("chatrooms").findOne({ roomName });
//     if (!existingRoom) {
//       await app.locals.db.collection("rooms").insertOne({ roomName, messages: [] });
//     }
//     res.redirect(`/${roomName}`);
//   } catch (error) {
//     console.error("Error creating chatroom:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });



// // get messages for room
// app.get('/:roomName/messages', async (req, res) => {
//   const roomName = req.params.roomName;
//   const room = await app.locals.db.collection("rooms").findOne({ roomName });
//   res.json(room ? room.messages : []);
// });


// // app.get('/rooms/:_id', async (req, res) => {
// //     try {
// //       const roomId = req.params._id;
// //       console.log('Requested Room Id: ', roomId);

// //       const roomMSG = await Room.findById(roomId).populate('messages');
// //       if (!roomMSG) {
// //         return res.status(404).json({ message: 'Room not found' });
// //       }

// //       res.json(roomMSG);
// //       //accessing the array of messages
// //       const messages = roomMSG.messages;
// //       //res.json(messages);
// //       console.log(messages);

// //     } catch (err) {
// //       res.status(500).json({ error: err.message });
// //     }
// // });


// //post messages to a chatroom
// app.post('/:roomName/messages', async (req, res) => {
//   const roomName = req.params.roomName;
//   const { user, content, time } = req.body;
//   await app.locals.db.collection("rooms").updateOne(
//     { roomName },
//     { $push: { messages: { user, content, time } } }
//   );
//   res.sendStatus(200);
// });


// NOTE: This is the sample server.js code we provided, feel free to change the structures
//GIVEN
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));