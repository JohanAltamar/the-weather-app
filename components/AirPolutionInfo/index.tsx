import classNames from "classnames";
import Image from "next/image";
import React, { useEffect } from "react";

enum AQILevel {
  GOOD = "Good",
  SATISFACTORY = "Satisfactory",
  MODERATELY_POLLUTED = "Moderately polluted",
  POOR = "Poor",
  VERY_POOR = "Very Poor",
  SEVERE = "Severe",
}

enum AQIColor {
  GOOD = "text-green-500",
  SATISFACTORY = "text-lime-500",
  MODERATELY_POLLUTED = "text-yellow-500",
  POOR = "text-amber-500",
  VERY_POOR = "text-red-500",
  SEVERE = "text-red-800",
}

export interface AirPolutionInfoProps {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

const AirPolutionInfo: React.FC<Partial<AirPolutionInfoProps>> = ({
  pm2_5,
}) => {
  const [aqiMessage, setAqiMessage] = React.useState<AQILevel>(AQILevel.GOOD);
  const [aqiColor, setAqiColor] = React.useState<AQIColor>(AQIColor.GOOD);

  const AQICalc = ({ pm2_5 }: Partial<AirPolutionInfoProps>) => {
    if (!pm2_5) return null;
    if (pm2_5 < 30) {
      setAqiMessage(AQILevel.GOOD);
      setAqiColor(AQIColor.GOOD);
    } else if (pm2_5 < 60) {
      setAqiMessage(AQILevel.SATISFACTORY);
      setAqiColor(AQIColor.SATISFACTORY);
    } else if (pm2_5 < 90) {
      setAqiMessage(AQILevel.MODERATELY_POLLUTED);
      setAqiColor(AQIColor.MODERATELY_POLLUTED);
    } else if (pm2_5 < 120) {
      setAqiMessage(AQILevel.POOR);
      setAqiColor(AQIColor.POOR);
    } else if (pm2_5 < 250) {
      setAqiMessage(AQILevel.VERY_POOR);
      setAqiColor(AQIColor.VERY_POOR);
    } else {
      setAqiMessage(AQILevel.SEVERE);
      setAqiColor(AQIColor.SEVERE);
    }
  };

  useEffect(() => {
    AQICalc({ pm2_5 });
  }, [pm2_5]);

  return (
    <div className="my-5 px-6">
      <header className="relative">
        <span className="text-base font-semibold">Air Polutions</span>
        <span className="absolute right-0 text-sm text-blue-600">Details</span>
      </header>
      <div className="mt-5 flex items-center">
        <figure className="w-8 h-10 mr-4 flex">
          <Image
            width={100}
            height={100}
            alt="Air polution icon"
            src="/icons/polution.svg"
          />
        </figure>
        <div>
          <div className="flex items-center">
            <span className={classNames("text-3xl", aqiColor)}>
              {pm2_5?.toFixed()}
            </span>
            <span className="ml-3 text-sm">| Micro Dust / PM2.5</span>
          </div>
          <div>
            <span className="font-semibold text-sm">{aqiMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirPolutionInfo;
