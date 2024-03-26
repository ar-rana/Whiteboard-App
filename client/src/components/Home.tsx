import React, { useContext, useEffect, useState } from "react";
import { userType } from "../userContext";
import { UserContext } from "../userContext";
import Rooms from "./layout/Rooms";
let ws: any;

const Home: React.FC = () => {
  const ENDPT: any = "ws://localhost:6060/";

  interface roomsType {
    name: string;
    _id: string;
    __v: any;
  }

  const context = useContext(UserContext);
  const user = context?.user;
  const setUser = context?.setUser;

  const [room, setRoom] = useState<string>("");
  const [rooms, setRooms] = useState<roomsType[]>([]);

  const jsonify = (data: any) => {
    return JSON.parse(data);
  };
  const sendJson = (data: any) => {
    return JSON.stringify(data);
  };

  useEffect(() => {
    ws = new WebSocket(ENDPT, "echo-protocol");
    ws.onerror = function (event: any) {
      console.log(event.error);
    };
    ws.onopen = function () {
      console.log("connected to ws server");
    };

    return () => {
      ws.onclose = function () {
        console.log("ws connection closed");
      };
    };
  }, [ENDPT]);

  useEffect(() => {
    // if (ws.readyState === WebSocket.OPEN) {
    //   ws.send(sendJson({
    //     type: "get-rooms"
    //   }))
    // }
    setTimeout(() => {
      ws.send(
        sendJson({
          type: "get-rooms",
        })
      );
    }, 1000);
  }, []);

  useEffect(() => {
    ws.onmessage = function (event: any) {
      console.log(event.data);
      const receiving = jsonify(event.data);
      console.log(receiving);
      if (receiving.type === "output-rooms") {
        const existingRooms = receiving.payload.rooms;
        console.log("received rooms: ", existingRooms);
        setRooms(existingRooms);
      }
      if (receiving.type === "room-created") {
        console.log("new-received: ", receiving.payload.room);
        setRooms((prevRooms) => [...prevRooms, receiving.payload.room]);
      }
    };
  }, []);

  useEffect(() => {
    console.log("Rooms mein kay hai:", rooms);
  }, [rooms]);

  const setRam = () => {
    const ram: userType = {
      name: "ram",
      email: "ram@gmail.com",
      password: "12345678",
      _id: "123",
    };
    if (setUser) {
      setUser(ram);
    }
  };

  const setSham = () => {
    const sham: userType = {
      name: "sham",
      email: "sham@gmail.com",
      password: "12345678",
      _id: "124",
    };
    if (setUser) {
      setUser(sham);
    }
  };

  const formhandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`${room} created`);
    ws.send(
      JSON.stringify({
        type: "create-room",
        payload: {
          room: room,
        },
      })
    );
    setRoom("");
  };

  // const btnHandler = (e: any) => {
  //   e.preventDefault();
  //   alert("room created");
  // };
  return (
    <div>
      <div className="d-flex flex-row flex-wrap">
        <div className="bg-lignt m-4">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Create Room</div>
            <div className="card-body text-primary position-relative p-5">
              <form onSubmit={formhandler}>
                <input
                  value={room}
                  type="text"
                  placeholder="Enter Room Name"
                  onChange={(e) => setRoom(e.target.value)}
                />
                <button type="submit" className="btn btn-info mt-3 ">
                  Create Room
                </button>
              </form>
            </div>
          </div>
        </div>
        <Rooms rooms={rooms} />
      </div>
      <button onClick={setRam}>Set ram as user</button>
      <button onClick={setSham}>Set sham as user</button>
      <h4>{JSON.stringify(user)}</h4>
    </div>
  );
};

export default Home;
