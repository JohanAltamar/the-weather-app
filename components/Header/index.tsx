import React, { useEffect } from "react";
import classNames from "classnames";
import {
  IoBatteryCharging,
  IoBatteryDead,
  IoBatteryFull,
  IoBatteryHalf,
  IoCellular,
  IoWifi,
} from "react-icons/io5";
// Components
import Clock from "../Clock";

const Header = ({ className }: { className?: string }) => {
  const [batteryLevel, setBatteryLevel] = React.useState(0);
  const [batteryCharging, setBatteryCharging] = React.useState(false);

  useEffect(() => {
    navigator
      .getBattery()
      .then(({ level, charging }: { level: number; charging: boolean }) => {
        setBatteryLevel(level);
        setBatteryCharging(charging);
      });
  }, [batteryLevel, batteryCharging]);

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
        <span
          title={`${batteryCharging ? "Charging" : "Discharging"} battery, ${
            batteryLevel * 100
          }% level`}
        >
          {batteryCharging && <IoBatteryCharging />}
          {!batteryCharging && batteryLevel > 0 && batteryLevel <= 0.2 && (
            <IoBatteryDead />
          )}
          {!batteryCharging && batteryLevel > 0.2 && batteryLevel <= 0.9 && (
            <IoBatteryHalf />
          )}
          {!batteryCharging && batteryLevel > 0.9 && <IoBatteryFull />}
        </span>
      </div>
    </header>
  );
};

export default Header;
