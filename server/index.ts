import express from "express";
import mongoose from "mongoose";
import { server as WebSocketServer } from "websocket";
import cors, { CorsOptions } from "cors";
import http from "http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Room from "./models/Room";
import { log } from "console";
dotenv.config();

const fOrigin: any = "http://localhost:3000/";

const options: CorsOptions = {
  origin: fOrigin,
};

const app: express.Application = express();

const PORT: Number | string = process.env.PORT || 6060;

app.use(cors(options));
app.use(bodyParser.json());

const server: any = http.createServer(app);

const DBURL: any = process.env.DBURL;
mongoose
  .connect(DBURL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const wss: any = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin: string) {
  return true;
}

const jsonify = (data: any) => {
  return JSON.parse(data);
};
const sendJson = (data: any) => {
  return JSON.stringify(data);
};

wss.on("request", function (request: any) {
  console.log("inside connect");
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

  connection.on("message", function (message: any) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      const receiving = jsonify(message.utf8Data);
      console.log("json: ", receiving);
      if (receiving.type === "get-rooms") {
        Room.find().then((result) => {
          connection.send(
            sendJson({ type: "output-rooms", payload: { rooms: result } })
          );
          console.log(result);
        });
      }
      if (receiving.type === "create-room") {
        console.log(receiving.payload.room);
        const newRoom = new Room({ name: receiving.payload.room });
        newRoom.save().then((result) =>
          connection.send(
            sendJson({
              type: "room-created",
              payload: {
                room: result,
              },
            })
          )
        );
      }

      //connection.sendUTF(message.utf8Data);
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on("close", function (reasonCode: any, description: any) {
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
