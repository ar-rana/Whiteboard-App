import express from "express";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";

interface forCors {
  origin: String;
  credentials?: String;
  allowedHeaders?: String;
}

const app: express.Application = express();

const fOrigin: String = "http://localhost:3000/";
const PORT: Number | String = process.env.PORT || 6060;

app.use(cors());
app.use(bodyParser.json());

const server: any = http.createServer(app);

const wss: any = new WebSocketServer({ server });

wss.on("connection", function connection(ws: any) {
  ws.on("error", console.error);

  //   ws.on("message", function message(data) {
  //     console.log("received: %s", data);
  //   });

  //   ws.send("something");
});

app.get("/",(req,res)=>{
    res.send("hello")
})

server.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
