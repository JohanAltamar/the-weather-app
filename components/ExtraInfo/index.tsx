import React from "react";

const speedConverter = (speed: number, from: string, to: string) => {
  if (from === "mps" && to === "kmh") {
    return `${(speed * 3.6).toFixed()} ${to}`;
  }
};

const getWindDirection = (deg: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const getWindInfo = (windInfo: { speed: number; deg: number }) => {
  // return "E 8 kmh";
  if (!windInfo) return "";
  const { speed, deg } = windInfo;
  return `${getWindDirection(deg)} ${speedConverter(speed, "mps", "kmh")}`;
};

interface ExtraInfoProps {
  humidity: number;
  uvi: number;
  wind: { speed: number; deg: number };
  isLoading?: boolean;
}
const ExtraInfo: React.FC<ExtraInfoProps> = ({
  humidity,
  uvi,
  wind,
  isLoading,
}) => {
  const displayInfo = !isLoading && humidity && uvi && wind;

  return (
    <section className="h-20 relative px-6 flex justify-between items-start after:absolute after:w-4/5 after:h-4 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:shadow-xl">
      <div className="flex flex-col items-center justify-center w-1/3">
        <span className="text-base font-semibold">
          {displayInfo ? `${humidity}%` : "XX"}
        </span>
        <span className="text-xs">Humidity</span>
      </div>
      <div className="flex flex-col items-center justify-center w-1/3">
        <span className="text-base font-semibold">
          {displayInfo ? `${uvi}` : "XX"}
        </span>
        <span className="text-xs">UV Index</span>
      </div>
      <div className="flex flex-col items-center justify-center w-1/3">
        <span className="text-base font-semibold">
          {displayInfo ? getWindInfo(wind) : "X X kmh"}
        </span>
        <span className="text-xs">Wind</span>
      </div>
    </section>
  );
};

export default ExtraInfo;
