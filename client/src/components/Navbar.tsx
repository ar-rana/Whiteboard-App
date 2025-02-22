import React from "react";
import logo from "../assets/logo.png";

interface Props {
  setColor: (color: string) => void;
  // users: string;
}

const Navbar: React.FC<Props> = (props) => {
  const users = ["User1", "User2", "User3", "Big Named User for truncation"];
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
            Color:{"  "}
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
        <p
          className="text-white font-bold self-center"
          title="Share this PIN for people to access you space"
        >
          PIN: 0000{" "}
        </p>
        <div className="relative flex flex-col items-center group justify-center">
          <label
            className="text-white font-bold cursor-pointer text-center w-full hover:underline"
            htmlFor="favcolor"
          >
            Collaborators
          </label>
          <ul className="absolute top-[80%] mt-1 bg-slate-700 text-white font-semibold shadow-lg hidden group-hover:flex flex-col items-center w-40 rounded-md">
            {users.map((user, i) => (
              <li
                key={i}
                className="px-2 py-1 w-full truncate text-center"
                title={user}
              >
                {user}
              </li> // title={user} to show full name when we hover on li
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
