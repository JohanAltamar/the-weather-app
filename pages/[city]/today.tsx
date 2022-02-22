import axios from "axios";
import { get } from "http";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  MdArrowUpward,
  MdChevronLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useQuery } from "react-query";
import Header from "../../components/Header";
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
        `http://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo?.lat}&lon=${cityInfo?.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
      );
      return data;
    },
    {
      enabled: !!cityInfo?.lat && !!cityInfo?.lon,
    }
  );

  console.log(weatherData);

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
            {idx === 0 && <DateTitle date={hour.dt} />}
            {idx > 0 &&
              getDate(hour.dt) !== getDate(weatherData?.hourly[idx - 1].dt) && (
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
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
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
        ))}
      </section>
    </PageLayout>
  );
};

export default TodayPage;

const DateTitle = ({ date }: { date: number }) => (
  <div className="font-semibold mt-3">
    {getWeekDay(date)}, {getDate(date)}
  </div>
);
