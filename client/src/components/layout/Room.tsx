import React from "react";

interface RoomProps {
  room: {
    name: string;
    _id: string;
    __v: any;
  };
}

const Room: React.FC<RoomProps> = ({ room }) => {
  const room_id = room._id;
  return (
    <div className="p-2">
      <div className="card text-center" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
          {/* <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p> */}
          <a href={"/whiteboard/"+room_id} className="btn btn-primary">
            Go to Room
          </a>
        </div>
      </div>
    </div>
  );
};

export default Room;
