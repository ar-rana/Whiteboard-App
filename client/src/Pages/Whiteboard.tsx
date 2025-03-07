import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';
import WhiteboardMenu from "../components/WhiteboardMenu";

interface drawObj {
  color: string;
  start: [number, number]; // this is a tuple
  end: [number, number];
  boardId: string;
}

interface eraseObj {
  xOffset: number;
  yOffset: number;
  eraser: number;
  boardId: string;
}

const Whiteboard: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams<string>();

  const [users, setUsers] = useState<string[]>([state.user]);
  const [pin, setPin] = useState<number | null>(state?.pin);
  const [color, setColor] = useState<string>("#ffffff");

  const stompWSRef = useRef<null | Client>(null);

  const colRef = useRef<string>(color);

  const isDown = useRef<boolean>(false);
  const drawing = useRef<boolean>(true);
  const eraseing = useRef<boolean>(false);
  
  const eraserSize = useRef<number>(5);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const posX = useRef<number>(0);
  const posY = useRef<number>(0);

  useEffect(() => {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;
    if (canvas == null) return;

    context.current = canvas.getContext("2d");
    context.current!.lineWidth = 1;

    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const draw = (e: MouseEvent) => {
    const ctx: CanvasRenderingContext2D = context.current!;
    ctx.strokeStyle = colRef.current;
    const x = posX.current;
    const y = posY.current;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(e.offsetX, e.offsetY);
    sendDrawMsg({
      boardId: id!,
      start: [x, y],
      end: [e.offsetX, e.offsetY],
      color: colRef.current,
    })
    ctx.stroke();
    ctx.closePath();

    posX.current = e.offsetX;
    posY.current = e.offsetY;
  };

  const erase = (e: MouseEvent) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const msg: eraseObj = {
      xOffset: x,
      yOffset: y,
      eraser: eraserSize.current,
      boardId: id!,
    }
    context.current?.clearRect(x, y, eraserSize.current, eraserSize.current);
    console.log("erase: ", msg);
    sendEraseMsg(msg);
  };

  const mouseDown = (e: MouseEvent) => {
    posX.current = e.offsetX;
    posY.current = e.offsetY;
    isDown.current = true;
  };

  const mouseUp = () => {
    isDown.current = false;
  };

  const mouseMove = (e: MouseEvent) => {
    if (isDown.current) {
      if (drawing.current) draw(e);
      if (eraseing.current) erase(e);
    }
  };

  const drawReceived = (msg: drawObj) => {
    const ctx: CanvasRenderingContext2D = context.current!;
    ctx.strokeStyle = msg.color;
    ctx.beginPath();

    ctx.moveTo(...msg.start);
    ctx.lineTo(...msg.end);

    ctx.stroke();
    ctx.closePath();
  }

  const eraseReceived = (msg: eraseObj) => {
    console.log("reached WS eraser");
    context.current?.clearRect(msg.xOffset, msg.yOffset, msg.eraser, msg.eraser);
  }

  useEffect(() => {
    colRef.current = color;
  }, [color]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8000/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 4000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected to STOMP");
        stompClient.subscribe(`/board/${id}`, async (res) => {
          console.log("Received Msg: ", res.body);
          const response = await JSON.parse(res.body).body;
          console.log("res msg: ", response);
          if (response.color) {
            drawReceived(response);
          } else {
            eraseReceived(response);
          }
        });
      },
      onStompError: (frame) => {
        console.log("Error: ", frame.body)
      }
    })

    stompClient.activate();
    stompWSRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    }
  }, [])

  const sendDrawMsg = (msg: drawObj) => {
    const stompClient = stompWSRef.current;
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/collab/draw/${id}`,
        body: JSON.stringify(msg),
      })
    } else {
      console.log("Not Connected to WS");
    }
  }

  const sendEraseMsg = (msg: eraseObj) => {
    const stompClient = stompWSRef.current;
    console.log("eraser msg: ", msg);
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/collab/erase/${id}`,
        body: JSON.stringify(msg),
      })
    } else {
      console.log("Not Connected to WS");
    }
  }

  useEffect(() => {
    const polling = setInterval(() => {
      getCollaborators();
    }, 6500)

    return () => {
      clearInterval(polling);
    }
  }, []);

  const getCollaborators = async () => {
    try {
      const res = await fetch(`http://localhost:8000/room/getCollabs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res.ok) {
        const users = await res.json();
        setUsers(users);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="relative flex flex-col h-screen">
      <div className="absolute top-0 border-b-white w-full z-10">
        <Navbar setColor={setColor} pin={pin} id={id} users={users}/>
      </div>
      <div className="h-full">
        <canvas
          id="canvas"
          className="bg-black"
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
      </div>
      <div className="absolute flex flex-col top-14 left-0 space-y-1">
        <WhiteboardMenu eraseing={eraseing} drawing={drawing} eraserSize={eraserSize} admin={state?.pin != null} setPin={setPin} user={state.user}/>
      </div>
    </div>
  );
};

export default Whiteboard;
