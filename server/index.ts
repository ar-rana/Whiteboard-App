import express from "express";
import mongoose from "mongoose";
import { server as WebSocketServer } from "websocket";
import cors, { CorsOptions } from "cors";
import http from "http";
import bodyParser from "body-parser";

const fOrigin: any = "http://localhost:3000/";

const options: CorsOptions = {
  origin: fOrigin,
};

const app: express.Application = express();

const PORT: Number | string = process.env.PORT || 6060;

app.use(cors(options));
app.use(bodyParser.json());

const server: any = http.createServer(app);

const wss: any = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin:string) {
  return true;
}

wss.on("request", function (request:any) {
  console.log("inside connect")
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  var connection = request.accept("echo-protocol", request.origin);
  console.log(new Date() + " Connection accepted.");
  connection.send("hello")
  connection.on("message", function (message:any) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on("close", function (reasonCode:any, description:any) {
    console.log(
      new Date() + " Peer " + connection.remoteAddress + " disconnected."
    );
  });
});

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

server.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
