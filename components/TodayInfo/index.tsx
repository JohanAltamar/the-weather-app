import React from "react";
import Link from "next/link";
import Image from "next/image";

interface WeatherInfo {
  dt: number;
  temp: number;
  uvi: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    description: string;
    icon: string;
  }[];
}

interface TodayInfoProps {
  city: string;
  forecast?: WeatherInfo[];
}

const TodayInfo: React.FC<TodayInfoProps> = ({ city, forecast }) => {
  const getHour = (date: number) => {
    return new Date(date * 1000)
      .toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      })
      .toLowerCase();
  };

  return (
    <div className="my-5 mb-8 px-6">
      <header className="relative">
        <span className="mr-5 text-base font-semibold">Today</span>
        {city && (
          <Link href={`${city}/today`} passHref>
            <button className="px-2 absolute right-0 text-sm text-blue-600 hover:cursor-pointer">
              See All
            </button>
          </Link>
        )}
      </header>
      <div className="flex mt-6">
        {forecast?.map((hour) => (
          <div
            key={hour.dt}
            className="cursor-default w-1/4 flex flex-col items-center"
          >
            <span className="relative h-10 w-10 mb-2">
              <Image
                alt="weather"
                layout="fill"
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              />
            </span>
            <span className="text-xs font-semibold mb-1">
              {hour.temp.toFixed()}°
            </span>
            <span className="text-xs">{getHour(hour.dt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayInfo;
