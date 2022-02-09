import React from "react";
import Image from "next/image";
// Components
import Clock from "../Clock";
import classNames from "classnames";

const Header = () => {
  return (
    <header className="px-5 h-11 flex justify-between items-center">
      <Clock />
      <div className="flex items-center h-11">
        <ImageContainer className="w-4">
          <Image
            width={24}
            height={44}
            src="/icons/cellular_connection.svg"
            alt="cellular_connection"
          />
        </ImageContainer>
        <ImageContainer className="w-4 mx-1.5">
          <Image width={24} height={44} src="/icons/wifi.svg" alt="wifi" />
        </ImageContainer>
        <ImageContainer>
          <Image
            width={24}
            height={44}
            src="/icons/battery.svg"
            alt="battery"
          />
        </ImageContainer>
      </div>
    </header>
  );
};

export default Header;

interface ImageContainerProps {
  className?: string;
}
const ImageContainer: React.FC<ImageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <figure className={classNames("h-full flex items-center", className)}>
      {children}
    </figure>
  );
};
