import './App.css';
import React, { useState, useEffect } from "react";
import socketClient  from "socket.io-client";
import { Button } from 'react-bootstrap';
const SERVER = "http://127.0.0.1:3003";

function App() {
  const [ClientName,setClientName]= useState("ClientName")
  const [ClientID,setClientID]= useState("ClientID")
  const [count,setCount]=useState(0)
  var socket = socketClient (SERVER);
  function ConnectToServer(){
    socket.on('connection', () => { 
      console.log(`I'm connected with the back-end`);
      setClientID(socket.id)
      setCount(count+1)
    }); 
  }

  return (
   <>
       <div style={{marginTop:"200px",marginLeft:"100px"}}> 
       <h3> Name: {ClientName}</h3>
       <h3>ID: {ClientID}</h3>
       <Button style={{ 
      width: "200px", 
      height: "50px",  
      border: "5px", 
      backgroundColor: "darkslategray",
      borderRadius: "17px" }}  onClick={ConnectToServer}> 
      Connect to Server
      </Button>
      <div> 
        <h1>
          {count}
        </h1>
        
      </div>
       </div>
   
   </>
  );
}

export default App;
