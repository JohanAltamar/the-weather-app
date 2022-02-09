import React from "react";

const AirPolutionInfo = () => {
  return (
    <div className="my-5 px-6">
      <header className="relative">
        <span className="text-base font-semibold">Air Polutions</span>
        <span className="absolute right-0 text-sm text-blue-600">Details</span>
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
  );
};

export default AirPolutionInfo;
