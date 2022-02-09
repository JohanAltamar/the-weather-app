import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
// Components
import AirPolutionInfo from "../components/AirPolutionInfo";
import CityInfo from "../components/CityInfo";
import ExtraInfo from "../components/ExtraInfo";
import Header from "../components/Header";
import TempInfo from "../components/TempInfo";
import TodayInfo from "../components/TodayInfo";

const WeatherPage = () => {
  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery(
    ["weather"],
    () => {
      return axios.get(`/api/weather?city=fusagasuga`);
    },
    {
      retry: false,
      // enabled: !!query.city,
    }
  );

  return (
    <div className="bg-gray-300 h-screen">
      <main className="max-w-sm mx-auto bg-white h-full">
        <Header />
        <TempInfo
          temp={weatherData?.data.main.temp}
          description={weatherData?.data.weather[0].description}
          icon={weatherData?.data.weather[0].icon}
        />
        <CityInfo
          cityName={weatherData?.data.name}
          countryCode={weatherData?.data.sys.country}
        />
        <ExtraInfo
          humidity={weatherData?.data.main.humidity}
          wind={weatherData?.data.wind}
          uvi={weatherData?.data.uvi || 11}
        />
        <TodayInfo />
        <AirPolutionInfo />
      </main>
    </div>
  );
};

export default WeatherPage;
