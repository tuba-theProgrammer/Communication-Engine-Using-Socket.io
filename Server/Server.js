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


io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    console.log(socket.username)
    next();
  });




var clients = [];

app.get('/',(req, res)=>{
  clients = []

for (let [id, socket] of io.of("/").sockets) {
  clients.push({
    userID: id,
    username: socket.username,
  });
}
  res.render("serverSide",{
     clients
   })
});




app.get('/RemoveClient', (req,res)=>{
  const {id}= req.query
  io.sockets.sockets.forEach((socket) => {
    // If given socket id is exist in list of all sockets, kill it
    if(socket.id === id)
      {  
        socket.disconnect(true);
        res.redirect('/')
      }
});
 
})

app.post('/SendBroadCastMsg', async (req,res)=>{
  console.log( await req.body)
  res.redirect('/')
 
})


app.get('/NotifyClient',(req,res)=>{
  const {id}= req.query
  console.log(id)
  const content= "notificaton from Server"
  io.sockets.sockets.forEach((socket) => {
    if(socket.id === id)
      {  
      
          socket.emit("msg", {
            content,
            to: socket.id
          });  
         res.redirect('/')
      }
     
});
 
})

app.get('/stopConnection',async (req,res)=>{
  io.sockets.sockets.forEach((socket) => {
        socket.disconnect(true);
});
   res.redirect('/')
}
)


app.get('/startConnection',async (req,res)=>{
  
  io.on('connection',function(socket){
    console.log('a new user is connected')
    socket.emit('connection', null);
})
res.redirect('/')
})



server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});