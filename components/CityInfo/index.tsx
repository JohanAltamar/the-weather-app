import React from "react";

interface CityInfoProps {
  cityName?: string;
  countryCode?: string;
  isLoading?: boolean;
}

const CityInfo: React.FC<CityInfoProps> = ({
  cityName,
  countryCode,
  isLoading,
}) => {
  const displayInfo = !isLoading && cityName && countryCode;

  return (
    <div className="my-5 px-6">
      <span className="text-xl font-semibold block">Altamar, Johan</span>
      <span className="text-xs">
        {displayInfo ? `${cityName}, ${countryCode}` : "Loading ..."}
      </span>
    </div>
  );
};

export default CityInfo;
