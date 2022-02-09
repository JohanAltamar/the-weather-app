import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import type { NextPage } from "next";
// Components
import AirPolutionInfo from "../../components/AirPolutionInfo";
import CityInfo from "../../components/CityInfo";
import ExtraInfo from "../../components/ExtraInfo";
import Header from "../../components/Header";
import TempInfo from "../../components/TempInfo";
import TodayInfo from "../../components/TodayInfo";

const City: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery(
    ["weather", query.city],
    () => {
      return axios.get(`/api/weather?city=${query.city}`);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      enabled: !!query.city,
    }
  );

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-300 h-screen">
        <main className="max-w-sm mx-auto bg-white h-full">
          <Header />
          <TempInfo
            temp={weatherData?.data.main.temp}
            description={weatherData?.data.weather[0].description}
            icon={weatherData?.data.weather[0].icon}
            isLoading={isLoading}
          />
          <CityInfo
            cityName={weatherData?.data.name}
            countryCode={weatherData?.data.sys.country}
            isLoading={isLoading}
          />
          <ExtraInfo
            humidity={weatherData?.data.main.humidity}
            wind={weatherData?.data.wind}
            uvi={weatherData?.data.uvi || 11}
            isLoading={isLoading}
          />
          <TodayInfo />
          <AirPolutionInfo />
        </main>
      </div>
    </>
  );
};

export default City;
