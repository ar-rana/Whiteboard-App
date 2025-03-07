import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Whiteboard from "./Whiteboard";
import Modal from "../components/Modal";

const BoardWrapper: React.FC = () => {
  const { id } = useParams<string>();
  const { state } = useLocation();
  const [auth, setAuth] = useState<boolean>(false);

  const verify = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/room/verify/${state.user}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (res.ok) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    verify()
  }, []);
  if (auth) {
    return <Whiteboard />;
  } else {
    return <Modal setAuth={setAuth} />
  }
};

export default BoardWrapper;
