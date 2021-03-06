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
      const { data } = await axios.get(`/api/city?name=${query.city}`);
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
        `/api/weather?lat=${cityInfo?.lat}&lon=${cityInfo?.lon}`
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
        `/api/air-quality?lat=${cityInfo?.lat}&lon=${cityInfo?.lon}`
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
          href={`https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
        />
      </Head>
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
      <TodayInfo
        city={query.city as string}
        forecast={weatherData?.hourly.slice(0, 4)}
      />
      <AirPolutionInfo pm2_5={polutionData?.list[0].components.pm2_5} />
    </PageLayout>
  );
};

export default City;
