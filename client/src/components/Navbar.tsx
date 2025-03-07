import React from "react";
import logo from "../assets/logo.png";
import { useParams } from "react-router-dom";

interface Props {
  setColor: (color: string) => void;
  pin: number | null;
  id: string | undefined;
  users: string[];
  user: string;
}

const Navbar: React.FC<Props> = (props) => {
  const { id } = useParams();
  const removeUser = (user: string) => {
    console.log(user);
    removeUserFetch(user);
  };

  const removeUserFetch = async (user: string) => {
    try {
      const res = await fetch(`http://localhost:8000/room/remove/${props.user}/${id}/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const users = await res.json();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className="w-full h-12 bg-gray-800 flex justify-around border-b-2">
      <div className="flex space-x-1 self-center">
        <a href="/">
          <img src={logo} className="rounded-lg h-6" alt="logo" />
        </a>
        <p className="text-white font-bold">Collaborative Board</p>
      </div>
      <div className="flex space-x-6">
        <form className="flex items-center space-x-2">
          <label
            className="text-white font-bold self-center"
            htmlFor="favcolor"
          >
            Color:
          </label>
          <input
            className="rounded-md p-0"
            type="color"
            id="favcolor"
            name="favcolor"
            onChange={(e) => props.setColor(e.target.value)}
            defaultValue="#ffffff"
          />
        </form>
        {props.pin ? (
          <p
            className="text-white font-bold self-center"
            title="Share this PIN for people to access you space"
          >
            PIN: {props.pin}
          </p>
        ) : (
          ""
        )}
        <div className="relative flex flex-col items-center group justify-center">
          <label
            className="text-white font-bold cursor-pointer text-center w-full hover:underline"
            htmlFor="favcolor"
          >
            Room-ID
          </label>
          <ul className="absolute top-[80%] mt-1.5 bg-white text-black font-semibold shadow-lg hidden group-hover:flex flex-col items-center w-80 rounded-md p-1">
            {props.id}
          </ul>
        </div>
        <div className="relative flex flex-col items-center group justify-center">
          <label
            className="text-white font-bold cursor-pointer text-center w-full hover:underline"
            htmlFor="favcolor"
          >
            Collaborators
          </label>
          <ul className="absolute top-[80%] mt-1 bg-slate-700 text-white font-semibold shadow-lg hidden group-hover:flex flex-col items-center w-36 rounded-md">
            {props.users.map((user, i) => (
              <li
                key={i}
                className="flex justify-around items-center px-2 py-1 w-full text-center rounded-md hover:bg-gray-500"
                title={user}
              >
                <span className="truncate">{user}</span>
                {props.pin ? (
                  <span
                    className="fa fa-ban text-md text-red-500 bg-white p-0.5 rounded"
                    title="Remove"
                    onClick={() => removeUser(user)}
                  ></span>
                ) : (
                  ""
                )}
              </li> // title={user} to show full name when we hover on li
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
