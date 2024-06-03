
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

module.exports = {
  getHome
};