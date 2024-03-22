import React, { useContext, useEffect } from "react";
import { userType } from "../userContext";
import { UserContext } from "../userContext";
let ws: any;

const Home: React.FC = () => {
  const ENDPT: any = "ws://localhost:6060/";

  const context = useContext(UserContext);
  const user = context?.user;
  const setUser = context?.setUser;

  useEffect(() => {
    ws = new WebSocket(ENDPT, "echo-protocol");
    ws.onerror = function (event: any) {
      console.log(event.error);
    };
    ws.onopen = function () {
      console.log("connected to ws server");
    };
    ws.onmessage = function (event: any) {
      console.log(event.data);
    };
    return () => {
      ws.onclose = function () {
        console.log("ws connection closed");
      };
    };
  }, [ENDPT]);

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

  const btnHandler = (e: any) => {
    e.preventDefault();
    alert("room created");
  };
  return (
    <div>
      <div className="flex-row flex-wrap">
        <div className="bg-lignt m-4">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Create Room</div>
            <div className="card-body text-primary position-relative p-5">
              <button
                className="font-weight-bold shadow bg-body rounded btn-lg rounded-circle border border-primary bg-grey position-absolute top-50 start-50 translate-middle"
                onClick={btnHandler}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={setRam}>Set ram as user</button>
      <button onClick={setSham}>Set sham as user</button>
      <h4>{JSON.stringify(user)}</h4>
    </div>
  );
};

export default Home;
