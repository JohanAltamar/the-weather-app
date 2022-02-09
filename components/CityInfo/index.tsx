import React from "react";

interface CityInfoProps {
  cityName: string;
  countryCode: string;
}

const CityInfo: React.FC<CityInfoProps> = ({ cityName, countryCode }) => {
  return (
    <div className="my-5 px-6">
      <span className="text-xl font-semibold block">Altamar, Johan</span>
      <span className="text-xs">{`${cityName}, ${countryCode}`}</span>
    </div>
  );
};

export default CityInfo;
