import { useState } from "react";
import { AiOutlineInfoCircle, AiOutlineCode } from "react-icons/ai";

import LinkPng from "../../assets/images/link.png";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex h-8 w-full flex-row items-center justify-between">
        <div className="flex h-full w-auto flex-row items-center">
          <img className="h-full w-auto shadow-lg" src={LinkPng} alt="" />
          <p className="ml-1 text-xl mobile:hidden">Quick Share</p>
          <p className="ml-1 hidden text-xl mobile:block mobile:text-lg">
            QShare
          </p>
        </div>
        <div className="flex h-full w-auto flex-row items-center rounded bg-white px-4 py-2 text-gray-800 shadow-lg mobile:px-1">
          {/* <div
            className="flex cursor-pointer flex-row items-center border-r pl-1 pr-2"
            onClick={() => setShowAbout(true)}
          >
            <AiOutlineInfoCircle />
            <p className="ml-2 mobile:text-sm">About</p>
          </div> */}
          <a
            href="https://github.com/balaganapathyparthiban/quickshare"
            target="_blank"
          >
            <div className="flex flex-row items-center pl-2 pr-1">
              <AiOutlineCode />
              <p className="ml-2 mobile:text-sm">Source Code</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
