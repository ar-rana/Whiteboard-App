import React, { useEffect } from "react";
import Navbar from "./layout/Navbar";
//import { client as WebSocketClient } from "websocket";
let ws:any;

const Home: React.FC = () => {
  const ENDPT: any = "ws://localhost:6060/";

  useEffect(() => {
    ws = new WebSocket(ENDPT,"echo-protocol");
    ws.onerror = function(event:any) {
      console.log(event.error);
    };
    ws.onopen = function (){
      console.log("connected to ws server")
    }
    ws.onmessage = function(event:any){
      console.log(event.data)
    }
    return ()=>{
      ws.onclose = function() {
        console.log("ws connection closed")
      };
    }

  }, [ENDPT]);

  const btnHandler = (e: any) => {
    e.preventDefault();
    alert("room created");
  };
  return (
    <div className="flex-row">
      <Navbar />
      <div className="bg-lignt m-4">
        <div className="card border-primary mb-3" style={{ maxWidth: "18rem" }}>
          <div className="card-header">Create Room</div>
          <div className="card-body text-primary position-relative p-5">
            <button
              className="shadow bg-body rounded btn-lg rounded-circle border border-primary bg-grey position-absolute top-50 start-50 translate-middle"
              onClick={btnHandler}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
