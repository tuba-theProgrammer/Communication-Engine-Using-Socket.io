import './App.css';
import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import { Button } from 'react-bootstrap';
const SERVER = "http://127.0.0.1:3003";

function App() {

var socket = '';

const [ClientID,setClientID]= useState("ClientID")
const [buttonState,setbuttonState]= useState(false)
const [ClientUsername,setClientUsername] = React.useState("");



function ConnectToServer(){
socket.on('connection', () => { 
console.log(`I'm connected with the back-end`);
setClientID(socket.id)
socket.on("msg", (arg) => {
  const {content} = arg
  if(!content){
    console.log("Msg Not Found")
  }else{
    console.log(content)
  
  } 
  });
});
setbuttonState(true)
}



const handleChange = (e) => {
setClientUsername(e.target.value);
};



const handleSubmit = (e) => {
e.preventDefault()
//usernameAlreadySelected = true;
socket = socketClient.connect(SERVER, {
  auth:{
    username: ClientUsername
  }
}
  );
ConnectToServer()

};





return (
<>
<div style={{marginTop:"200px",marginLeft:"100px"}}>
<form  >
<input style={{border: "5px solid black", width:"200px", height:'50px' }} type="text" onChange={handleChange}/>
<input type="submit" style={{ 
width: "200px", 
height: "50px", 
border: "5px", 
color:"white",
backgroundColor: "darkslategray",
borderRadius: "17px" }} value="Connect to Server"
onClick={handleSubmit} disabled={buttonState}/>
</form>
<div>
<h3>ID: {ClientID}</h3>
</div>


<div> 
<h4>Notifications</h4>
<div>


</div>
</div>


<div>
<form  >
<input style={{border: "5px solid black", width:"200px", height:'50px' }} type="text" />
<input type="submit" style={{ 
width: "200px", 
height: "50px", 
border: "5px", 
color:"white",
backgroundColor: "darkslategray",
borderRadius: "17px" }} value="Send Message"
 disabled={buttonState}/>
</form>
</div>

</div>
</>
);
}

export default App;

