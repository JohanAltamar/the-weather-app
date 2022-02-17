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

  const { data: prevWeatherData } = useQuery<WeatherResponse>(
    ["prevWeather", query.city],
    async () => {
      const { data } = await axios.get(
        // `http://api.openweathermap.org/data/2.5/onecall/timemachine?dt=1644464521&lat=${cityInfo?.lat}&lon=${cityInfo?.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${
          cityInfo?.lat
        }&lon=${cityInfo?.lon}&dt=${(
          new Date().getTime() / 1000
        ).toFixed()}&appid=d5288300908406b3dd1543153fed9b6a&units=metric`
      );
      return data;
    },
    {
      enabled: !!cityInfo?.lat && !!cityInfo?.lon,
    }
  );

  const { data: polutionData } = useQuery<PolutionResponse>(
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
      enabled: !!cityInfo?.lat && !!cityInfo?.lon,
    }
  );
  // TODO: Add refetch icon
  return (
    <PageLayout>
      <Head>
        <title>{cityInfo?.name} | Weather App</title>
        <meta
          name="description"
          content={`Current weather in ${cityInfo?.name} city`}
        />
        <link
          rel="icon"
          href={`http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
        />
      </Head>
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
    </PageLayout>
  );
};

export default City;
