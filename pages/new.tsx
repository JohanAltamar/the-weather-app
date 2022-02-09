import React from "react";

const WeatherPage = () => {
  return (
    <div className="bg-gray-300 h-screen">
      <div className="max-w-sm mx-auto bg-white h-full">
        <div className="px-5 h-11 flex justify-between items-center">
          <span className="px-4">9:41</span>
          <span className="flex">
            <img className="w-4" src="/icons/cellular_connection.svg" />
            <img className="w-4 mx-1.5" src="/icons/wifi.svg" />
            <img className="w-6" src="/icons/battery.svg" />
          </span>
        </div>
        <div className="my-3 h-20 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-5xl">30°</span>
            <span className="ml-2 border-l-2 border-black pl-1 text-sm ">
              Partly Cloudy
            </span>
          </div>
          <img className="w-20" src="/icons/morning_partial.svg" />
        </div>
        <div className="my-5 px-6">
          <span className="text-xl font-semibold block">Howdy, Alver</span>
          <span className="text-xs">South Jakarta, Indonesia</span>
        </div>
        <div className="h-20 relative px-6 flex justify-between items-start after:absolute after:w-4/5 after:h-4 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:shadow-xl">
          <div className="flex flex-col items-center justify-center w-1/3">
            <span className="text-base font-semibold">61%</span>
            <span className="text-xs">Humidity</span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <span className="text-base font-semibold">11</span>
            <span className="text-xs">UV Index</span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <span className="text-base font-semibold">E 8 kmh</span>
            <span className="text-xs">Wind</span>
          </div>
        </div>
        <div className="my-5 mb-8 px-6">
          <header className="relative">
            <span className="mr-5 text-base font-semibold">Today</span>
            <span className="text-sm text-gray-400">Tomorrow</span>
            <span className="absolute right-0 text-sm text-blue-600">
              See All
            </span>
          </header>
          <div className="flex mt-6">
            <div className="w-1/4 flex flex-col items-center">
              <img
                className="w-10 aspect-square mb-2"
                src="/icons/morning_partial.svg"
              />
              <span className="text-xs font-semibold mb-1">30°</span>
              <span className="text-xs">Morning</span>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <img
                className="w-10 aspect-square mb-2"
                src="/icons/morning_partial.svg"
              />
              <span className="text-xs font-semibold mb-1">28°</span>
              <span className="text-xs">Afternoon</span>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <img
                className="w-10 aspect-square mb-2"
                src="/icons/evening_raining.svg"
              />
              <span className="text-xs font-semibold mb-1">26°</span>
              <span className="text-xs">Evening</span>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <img
                className="w-10 aspect-square mb-2"
                src="/icons/night_rain.svg"
              />
              <span className="text-xs font-semibold mb-1">25°</span>
              <span className="text-xs">Night</span>
            </div>
          </div>
        </div>
        <div className="my-5 px-6">
          <header className="relative">
            <span className="text-base font-semibold">Air Polutions</span>
            <span className="absolute right-0 text-sm text-blue-600">
              Details
            </span>
          </header>
          <div className="mt-7 flex">
            <img className="w-8 h-10 mr-4" src="/icons/polution.svg" />
            <div>
              <div className="flex items-center">
                <span className="text-3xl text-red-400">162</span>
                <span className="ml-3 text-sm">| Micro Dust / PM2.5</span>
              </div>
              <div>
                <span className="font-semibold text-sm">Unhealthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
