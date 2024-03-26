import React from "react";
import Room from "./Room";

interface Props {
  rooms: {
    name: string;
    _id: string;
    __v: any;
  }[];
}

const Rooms: React.FC<Props> = ({ rooms }) => {
  return (
    <div className="d-flex flex-wrap flex-row m-2 p-4">
      {rooms && rooms.map((room) => <Room room={room} key={room._id} />)}
    </div>
  );
};

export default Rooms;
