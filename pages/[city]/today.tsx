import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
// Icons
import { BsWind, BsFillCloudsFill, BsClouds } from "react-icons/bs";
import { FaTemperatureLow } from "react-icons/fa";
import { GiHeavyRain } from "react-icons/gi";
import {
  MdChevronLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineWaterDrop,
  MdOutlineWbSunny,
} from "react-icons/md";
// Templates
import PageLayout from "../../components/layouts/PageLayout";

interface CityInfo {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state: string;
}

interface WeatherInfo {
  dt: number;
  clouds: number;
  temp: number;
  feels_like: number;
  uvi: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    description: string;
    icon: string;
  }[];
  rain?: {
    "1h": number;
  };
}

interface WeatherResponse {
  current: WeatherInfo;
  daily: WeatherInfo[];
  hourly: WeatherInfo[];
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDate = (date: number) => {
  return new Date(date * 1000).getDate();
};
const getWeekDay = (date: number) => {
  return weekDays[new Date(date * 1000).getDay()];
};
const getHour = (date: number) => {
  return new Date(date * 1000)
    .toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .toLowerCase();
};

const getMonth = (date: number) => {
  return new Date(date * 1000)
    .toLocaleString("en-US", {
      month: "long",
    })
    .toLowerCase();
};

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

const getWindInfo = (windInfo: { speed?: number; deg?: number }) => {
  // return "E 8 kmh";
  if (windInfo.deg === undefined || windInfo.speed === undefined) return "";
  const { speed, deg } = windInfo;
  return `${getWindDirection(deg)} ${speedConverter(speed, "mps", "kmh")}`;
};

const TodayPage = () => {
  const router = useRouter();
  const { query, back } = router;

  const [expandedHours, setExpandedHours] = useState<number[]>([]);

  const { data: cityInfo } = useQuery<CityInfo>(
    ["cityInfo", query.city],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query.city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
      );
      return data[0];
    },
    {
      enabled: !!query.city,
    }
  );

  const { data: weatherData, isLoading } = useQuery<WeatherResponse>(
    ["weather", query.city],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo?.lat}&lon=${cityInfo?.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
      );
      return data;
    },
    {
      enabled: !!cityInfo?.lat && !!cityInfo?.lon,
    }
  );

  const handleHourClick = (date: number) => () => {
    if (expandedHours.includes(date)) {
      setExpandedHours(expandedHours.filter((d) => d !== date));
    } else {
      setExpandedHours([...expandedHours, date]);
    }
  };

  return (
    <PageLayout>
      <div className="relative px-6 mb-10">
        <button
          className="absolute text-4xl top-1/2 -translate-y-1/2"
          onClick={back}
        >
          <MdChevronLeft />
        </button>
        <h6 className="text-center font-semibold">Today</h6>
      </div>
      <section className="global-padding">
        {weatherData?.hourly.map((hour, idx) => (
          <div key={hour.dt}>
            <div>
              {idx === 0 && <DateTitle date={hour.dt} />}
              {idx > 0 &&
                getDate(hour.dt) !==
                  getDate(weatherData?.hourly[idx - 1].dt) && (
                  <DateTitle date={hour.dt} />
                )}
              <button
                className="w-full grid grid-cols-12 items-center"
                onClick={handleHourClick(hour.dt)}
              >
                <span className="col-span-3">{getHour(hour.dt)}</span>
                <span className="col-span-2">{hour.temp.toFixed()}°</span>
                <span className="relative h-10 w-10 mx-auto col-span-3">
                  <Image
                    alt="weather"
                    layout="fill"
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  />
                </span>
                <span className="col-span-3">{hour.humidity}%</span>
                <span className="col-span-1">
                  {expandedHours.includes(hour.dt) ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </span>
              </button>
            </div>
            {expandedHours.includes(hour.dt) && (
              <div className="w-full px-8 border border-gray-300 rounded-lg">
                <div className="flex border-b border-gray-300 py-1">
                  <ExpandedItem className="w-1/2">
                    <FaTemperatureLow className="mr-2" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Feels Like</span>
                      <span className="font-semibold text-sm">
                        {hour.feels_like.toFixed()}°
                      </span>
                    </div>
                  </ExpandedItem>
                  <ExpandedItem className="w-1/2">
                    <BsWind className="mr-2" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Wind</span>
                      <span className="font-semibold text-sm">
                        {getWindInfo({
                          speed: hour.wind_speed,
                          deg: hour.wind_deg,
                        })}
                      </span>
                    </div>
                  </ExpandedItem>
                </div>
                <div className="flex border-b border-gray-300 py-1">
                  <ExpandedItem className="w-1/2">
                    <MdOutlineWaterDrop className="mr-2" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Humidity</span>
                      <span className="font-semibold text-sm">
                        {hour.humidity.toFixed()}%
                      </span>
                    </div>
                  </ExpandedItem>
                  <ExpandedItem className="w-1/2">
                    <MdOutlineWbSunny className="mr-2" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">UV Index</span>
                      <span className="font-semibold text-sm">
                        {hour.uvi.toFixed()}
                      </span>
                    </div>
                  </ExpandedItem>
                </div>
                <div className="flex py-1">
                  <ExpandedItem className="w-1/2">
                    <BsClouds className="mr-2" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Cloud Cover</span>
                      <span className="font-semibold text-sm">
                        {hour.clouds.toFixed()}%
                      </span>
                    </div>
                  </ExpandedItem>
                  <ExpandedItem className="w-1/2">
                    <GiHeavyRain className="mr-2" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Rain</span>
                      <span className="font-semibold text-sm">
                        {hour?.rain
                          ? (hour?.rain?.["1h"] / 10).toFixed()
                          : " - - -"}{" "}
                        cm
                      </span>
                    </div>
                  </ExpandedItem>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </PageLayout>
  );
};

export default TodayPage;

const DateTitle = ({ date }: { date: number }) => (
  <div className="font-semibold mt-3">
    {getWeekDay(date)}, {getDate(date)} {getMonth(date)}
  </div>
);

interface ExpandedItemProps {
  className?: string;
}

const ExpandedItem: React.FC<ExpandedItemProps> = ({ children, className }) => (
  <div className={classNames("flex items-center", className)}>{children}</div>
);
