import React, { useEffect, useRef, useState } from "react";

const Modal = () => {
  const [pin, setPin] = useState("");

  const nextInput = (e) => {
    const target = e.target;
    const val = target.value;
    let isnum = /^\d+$/.test(val);
    console.log(val);

    if (!isnum || val == "") return;
    setPin(prev => prev.concat(val));

    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    }
  };

  const deleteInput = (e) => {
    if (pin === "") return;
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key == "backspace" || key == "delete") {
        setPin("");
        target.value = "";
        let prev = target.previousElementSibling;
        let next = target.nextElementSibling;
        while(prev || next) {
            if (prev) prev.focus();
            if (prev) prev.value = "";
            if (next) next.value = "";
            if (prev) prev = prev.previousElementSibling;
            if (next) next = next.nextElementSibling;
        }
    }
  };
  
  return (
    <div className="w-screen h-screen bg-slate-100">
      <div className="absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 border-black rounded-md shadow-md bg-white">
        <h3 className="text-lg font-bold text-black px-4 border-b-2 border-black w-full">
          Enter PIN for this Board
        </h3>
        <div id="inputs" className="flex justify-center items-center mt-2">
          <input
            type="text"
            maxLength="1"
            className="font-semibold border-2 border-black w-8 h-8 m-2 p-2.5 rounded"
            onChange={nextInput}
            onKeyUp={deleteInput}
          />
          <input
            type="text"
            maxLength="1"
            className="font-semibold border-2 border-black w-8 h-8 m-2 p-2.5 rounded"
            onChange={nextInput}
            onKeyUp={deleteInput}
          />
          <input
            type="text"
            maxLength="1"
            className="font-semibold border-2 border-black w-8 h-8 m-2 p-2.5 rounded"
            onChange={nextInput}
            onKeyUp={deleteInput}
          />
          <input
            type="text"
            maxLength="1"
            className="font-semibold border-2 border-black w-8 h-8 m-2 p-2.5 rounded"
            onChange={nextInput}
            onKeyUp={deleteInput}
          />
        </div>
        <button className="bg-black font-semibold text-lg text-white rounded-xl px-3 shadow-lg active:shadow-none ml-6 mr-auto m-1 mb-2">Submit</button>
      </div>
    </div>
  );
};

export default Modal;
