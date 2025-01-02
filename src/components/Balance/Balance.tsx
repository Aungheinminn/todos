"use client";
import { useState } from "react";
import Image from "next/image";
import eye from "@/assets/eye.svg";
import eyeHide from "@/assets/eye_hide.svg";

const Balance = () => {
  const [hide, setHide] = useState<boolean>(false);
  return (
    <div className="w-full bg-gray-800 justify-start items-center px-2 py-3 rounded-b-xl">
      <div className="flex flex-col ">
        <div className="flex justify-start items-center gap-x-2">
          <p className="text-xl text-white font-normal">{ hide ? "**********" : "K 100000000"}</p>
          <div onClick={() => setHide(!hide)}>
            {hide ? (
              <Image
                className="w-6 h-6 cursor-pointer"
                src={eyeHide}
                alt="eye hide"
              />
            ) : (
              <Image className="w-6 h-6 cursor-pointer" src={eye} alt="eye" />
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500">Total Balance</p>
      </div>
    </div>
  );
};

export default Balance;
