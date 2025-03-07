import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Home: React.FC = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const createRoomHandler = (): void => {
    if (!name) {
      alert("Name field is Required!!");
      return;
    }
    navigate("/whiteboard", { state: { pin: generatePin() }});
    console.log("Hello");
  };

  const generatePin = (): number => {
    let pin = 0;
    for (let i=0;i<4;i++) {
      pin = pin*10 + Math.floor(Math.random() * 10);
    }
    return pin;
  }

  return (
    <div className="absolute bg-slate-800 w-full h-full flex flex-col items-center">
      <div className="relative top-[20%]">
        <div className="flex space-x-4">
          <img className="rounded-lg h-10" src={logo} alt="logo" />
          <span className="text-4xl text-white font-bold">
            Collaborative WhiteBoard
          </span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <a
            className="text-white fa fa-github-square text-3xl"
            href="https://github.com/ar-rana"
            target="_blank"
          ></a>
          <a
            className="text-white fa fa-linkedin-square text-3xl"
            href="https://www.linkedin.com/in/-aryan-rana/"
            target="_blank"
          ></a>
        </div>
      </div>
      <div className="p-4 rounded-lg flex flex-col w-[20%] border-2 border-gray-600 relative top-[30%] space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="text-lg p-1 text-white font-bold border-2 border-white rounded bg-inherit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={createRoomHandler}
          className="w-full text-white p-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Home;
