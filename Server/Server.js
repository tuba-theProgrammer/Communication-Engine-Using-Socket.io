const app = require('express')();
const server = require('http').createServer(app);
app.set("view engine","ejs")
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 3003;
var cors = require('cors')
app.use(cors());


var clients = [];

app.get('/', function(req, res) {
  res.render("serverSide",{
     clients
   })
});


io.on('connection',function(socket){
    clients.push(socket); 
    console.log('a new user is connected')
    socket.emit('connection', null);
  
})


 
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});