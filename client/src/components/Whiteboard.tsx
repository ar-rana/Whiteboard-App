import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Line, Text } from "react-konva";
import { useParams, Link } from "react-router-dom";

const Whiteboard: React.FC = () => {
  const { room_id } = useParams();
  const [tool, setTool] = useState<string>("pen");
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div style={{overflowX:"hidden"}}>
      <select
        className="btn btn-success m-2 p-1"
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>

      <Link to="/">
        <button className="btn btn-primary">Go Back Home</button>
      </Link>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight-0.185*window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line: any, i: any) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

// const container: HTMLElement | null = document.getElementById("root");
// if (container) {
//   const root = createRoot(container);
//   root.render(<Whiteboard />);
// } else {
//   console.error("Container element with id 'root' not found.");
// }

export default Whiteboard;
