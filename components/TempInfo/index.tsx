import React from "react";
import Image from "next/image";

interface TempInfoProps {
  temp: number;
  description: string;
  icon: string;
}
const TempInfo: React.FC<TempInfoProps> = ({ temp, description, icon }) => {
  return (
    <section className="my-3 h-20 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-5xl">{`${temp.toFixed()}°`}</span>
        <span className="ml-2 border-l-2 border-black capitalize pl-1 text-sm ">
          {description}
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
