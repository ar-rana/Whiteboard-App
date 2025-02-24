import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

const Whiteboard = () => {
  const [color, setColor] = useState<string>("#ffffff");
  const [coord, setCoords] = useState<number[]>([]);

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

    ctx.beginPath();
    ctx.moveTo(posX.current, posY.current);
    ctx.lineTo(e.offsetX, e.offsetY);
    // console.log(e.offsetX, " - ", e.offsetY);
    ctx.stroke();
    ctx.closePath();

    posX.current = e.offsetX;
    posY.current = e.offsetY;
  };

  const erase = (e: MouseEvent) => {
    context.current?.clearRect(e.offsetX, e.offsetY, eraserSize.current, eraserSize.current);
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

  useEffect(() => {
    colRef.current = color;
  }, [color]);

  return (
    <div className="relative flex flex-col h-screen">
      <div className="absolute top-0 border-b-white w-full z-10">
        <Navbar setColor={setColor} />
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
        <button
          className="relative bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-eraser group"
          title="Eraser"
        >
          <ul
            className="hidden absolute left-full top-0 mt-1 bg-slate-700 text-white font-semibold shadow-lg group-hover:flex flex-col items-center w-20 rounded-md"
            onClick={() => {
              eraseing.current = true;
              drawing.current = false;
            }}
          >
            <li
              className="px-2 py-1 w-full rounded-md hover:bg-gray-500"
              onClick={() => (eraserSize.current = 5)}
            >
              <span className="fa fa-square-o text-xs"></span>
            </li>
            <li
              className="px-2 py-1 w-full rounded-md hover:bg-gray-500"
              onClick={() => (eraserSize.current = 10)}
            >
              <span className="fa fa-square-o text-sm"></span>
            </li>
            <li
              className="px-2 py-1 w-full rounded-md hover:bg-gray-500"
              onClick={() => (eraserSize.current = 15)}
            >
              <span className="fa fa-square-o text-lg"></span>
            </li>
            <li
              className="px-2 py-1 w-full rounded-md hover:bg-gray-500"
              onClick={() => (eraserSize.current = 25)}
            >
              <span className="fa fa-square-o text-xl"></span>
            </li>
          </ul>
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-pencil-square-o"
          title="Pencil"
          onClick={() => {
            eraseing.current = false;
            drawing.current = true;
          }}
        ></button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-ravelry"
          title="RESET PIN"
        ></button>
      </div>
    </div>
  );
};

export default Whiteboard;
