import React from "react";

const TodayInfo = () => {
  return (
    <div className="my-5 mb-8 px-6">
      <header className="relative">
        <span className="mr-5 text-base font-semibold">Today</span>
        <span className="text-sm text-gray-400">Tomorrow</span>
        <span className="absolute right-0 text-sm text-blue-600">See All</span>
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
  );
};

export default TodayInfo;
