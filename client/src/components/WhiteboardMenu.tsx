import React from "react";

interface Props {
    eraseing: React.RefObject<boolean>;
    drawing: React.RefObject<boolean>;
    eraserSize: React.RefObject<number>;
}

const WhiteboardMenu: React.FC<Props> = (props) => {
  return (
    <>
      <button
        className="relative bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-eraser group"
        title="Eraser"
      >
        <ul
          className="hidden absolute left-full top-0 mt-1 bg-slate-700 text-white font-semibold shadow-lg group-hover:flex flex-col items-center w-20 rounded-md"
          onClick={() => {
            props.eraseing.current = true;
            props.drawing.current = false;
          }}
        >
          <li
            className="px-2 py-1 w-full rounded-md hover:bg-gray-500 active:bg-slate-400"
            onClick={() => (props.eraserSize.current = 5)}
          >
            <span className="fa fa-square-o text-xs"></span>
          </li>
          <li
            className="px-2 py-1 w-full rounded-md hover:bg-gray-500 active:bg-slate-400"
            onClick={() => (props.eraserSize.current = 10)}
          >
            <span className="fa fa-square-o text-sm"></span>
          </li>
          <li
            className="px-2 py-1 w-full rounded-md hover:bg-gray-500 active:bg-slate-400"
            onClick={() => (props.eraserSize.current = 15)}
          >
            <span className="fa fa-square-o text-lg"></span>
          </li>
          <li
            className="px-2 py-1 w-full rounded-md hover:bg-gray-500 active:bg-slate-400"
            onClick={() => (props.eraserSize.current = 28)}
          >
            <span className="fa fa-square-o text-xl"></span>
          </li>
        </ul>
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-pencil-square-o active:bg-gray-500"
        title="Pencil"
        onClick={() => {
          props.eraseing.current = false;
          props.drawing.current = true;
        }}
      ></button>
      <button
        className="relative bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-ravelry group"
        title="RESET PIN"
      >
        <span className="hidden absolute border-2 border-blue-500 border-l-0 left-0 top-full max-w-fit px-2.5 py-1 bg-gray-100 rounded-r-md group-hover:block active:bg-gray-500">
          Reset PIN
        </span>
      </button>
    </>
  );
};

export default WhiteboardMenu;
