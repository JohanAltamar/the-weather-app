import React from "react";
import classNames from "classnames";
import { IoBatteryFull, IoCellular, IoWifi } from "react-icons/io5";
// Components
import Clock from "../Clock";

const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={classNames(
        "px-5 h-11 flex justify-between items-center",
        className
      )}
    >
      <Clock />
      <div className="flex items-center h-11 text-xl">
        <IoCellular />
        <IoWifi className="mx-1.5" />
        <IoBatteryFull />
      </div>
    </header>
  );
};

export default Header;
