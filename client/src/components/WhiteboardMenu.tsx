import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  eraseing: React.RefObject<boolean>;
  drawing: React.RefObject<boolean>;
  eraserSize: React.RefObject<number>;
  admin: boolean;
  // setPin: (pin: number) => void;
  pinRef: React.RefObject<number | null>;
  user: string;
}

const WhiteboardMenu: React.FC<Props> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const generatePin = (): number => {
    let pin = 0;
    for (let i = 0; i < 4; i++) {
      pin = pin * 10 + Math.floor(Math.random() * 10);
    }
    return pin;
  };

  const resetPin = async () => {
    const pin = generatePin();
    // props.setPin(pin);
    props.pinRef.current = pin;
    try {
      const res = await fetch(`http://localhost:8000/room/reset/${props.user}/${id}/${pin}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const response = await res.text();
        navigate(`/whiteboard/${id}`, { state: { pin: pin, user: props.user }});
        alert(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      {props.admin ? (
        <button
          className="relative bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded-r fa fa-ravelry group"
          title="RESET PIN"
          onClick={resetPin}
        >
          <span className="hidden absolute border-2 border-blue-500 border-l-0 left-0 top-full max-w-fit px-2.5 py-1 bg-gray-100 rounded-r-md group-hover:block active:bg-gray-500">
            Reset PIN
          </span>
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default WhiteboardMenu;
