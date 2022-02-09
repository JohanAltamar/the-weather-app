import React from "react";
import Image from "next/image";

interface TempInfoProps {
  temp: number;
  description: string;
  icon: string;
  isLoading?: boolean;
}
const TempInfo: React.FC<TempInfoProps> = ({
  description,
  icon,
  isLoading,
  temp,
}) => {
  const displayInfo = !isLoading && temp && description;

  return (
    <section className="my-3 h-20 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-5xl">{`${
          displayInfo ? temp?.toFixed() : "XX"
        }°`}</span>
        <span className="ml-2 border-l-2 border-black capitalize pl-1 text-sm ">
          {displayInfo ? description : "Loading..."}
        </span>
      </div>
      <Image
        width={80}
        height={80}
        alt="weather icon"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
    </section>
  );
};

export default TempInfo;
