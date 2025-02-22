import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

const Whiteboard = () => {
  const [color, setColor] = useState<string>("#ffffff");
  const [coord, setCoords] = useState<number[]>([]);
  
  const drawing = useRef<boolean>(false);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const posX = useRef<number>(0);
  const posY = useRef<number>(0);

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (canvas == null) return;

    context.current = canvas.getContext("2d");
    context.current!.lineWidth = 1;

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);

    return () => {
      canvas.removeEventListener('mousedown', mouseDown);
      canvas.removeEventListener('mouseup', mouseUp);
      canvas.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const draw = (e: any) => {
    if (drawing.current) {
      const ctx: CanvasRenderingContext2D = context.current!;
      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.moveTo(posX.current, posY.current);
      ctx.lineTo(e.offsetX, e.offsetY);
      console.log(e.offsetX, " - ", e.offsetY);
      ctx.stroke();
      ctx.closePath();

      posX.current = e.offsetX;
      posY.current = e.offsetY;
    }
  };

  const mouseDown = (e: MouseEvent) => {
    posX.current = e.offsetX;
    posY.current = e.offsetY;
    drawing.current = true;
  };

  const mouseUp = () => {
    drawing.current = false;
  };

  const mouseMove = (e: MouseEvent) => {
    draw(e);
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="absolute top-0 border-b-white w-full z-10">
        <Navbar setColor={setColor}/>
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
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-eraser"
          title="Eraser"
        ></button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-pencil-square-o"
          title="Pencil"
        ></button>
      </div>
    </div>
  );
};

export default Whiteboard;
