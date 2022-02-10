import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import type { NextPage } from "next";
// Components
import AirPolutionInfo, {
  AirPolutionInfoProps,
} from "../../components/AirPolutionInfo";
import CityInfo from "../../components/CityInfo";
import ExtraInfo from "../../components/ExtraInfo";
import Header from "../../components/Header";
import TempInfo from "../../components/TempInfo";
import TodayInfo from "../../components/TodayInfo";

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

interface PolutionResponse {
  list: {
    components: AirPolutionInfoProps;
  }[];
}

const City: NextPage = () => {
  const router = useRouter();
  const { query } = router;

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

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery<WeatherResponse>(
    ["weather", query.city],
    async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo?.lat}&lon=${cityInfo?.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      enabled: !!cityInfo,
    }
  );

  const {
    data: polutionData,
    isLoading: polutionIsLoading,
    error: polutionError,
  } = useQuery<PolutionResponse>(
    ["polution", query.city],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${
          cityInfo!.lat
        }&lon=${cityInfo!.lon}&appid=${
          process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
        }&units=metric`
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      enabled: !!cityInfo?.lat && !!cityInfo?.lon,
    }
  );

  console.log(weatherData);

  return (
    <>
      <Head>
        <title>{cityInfo?.name} | Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-300 h-screen">
        <main className="max-w-sm mx-auto bg-white h-full">
          <Header />
          <TempInfo
            temp={weatherData?.current.temp}
            description={weatherData?.current.weather[0].description}
            icon={weatherData?.current.weather[0].icon}
            isLoading={isLoading}
          />
          <CityInfo
            cityName={cityInfo?.name}
            countryCode={cityInfo?.country}
            isLoading={isLoading}
          />
          <ExtraInfo
            humidity={weatherData?.current?.humidity}
            wind={{
              speed: weatherData?.current?.wind_speed,
              deg: weatherData?.current.wind_deg,
            }}
            uvi={weatherData?.current.uvi}
            isLoading={isLoading}
          />
          <TodayInfo />
          <AirPolutionInfo pm2_5={polutionData?.list[0].components.pm2_5} />
        </main>
      </div>
    </>
  );
};

export default City;
