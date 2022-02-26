import React from "react";
// Templates
import PageLayout from "../components/layouts/PageLayout";

const AcknowledgmentPage = () => {
  return (
    <PageLayout>
      <div className="global-padding">
        <h1 className="text-center my-5 font-semibold text-gray-600 text-2xl">
          Acknowledgment
        </h1>
        <p>This project was possible thanks to the following tools:</p>
        <ul className="mt-2 text-gray-800 list-disc px-5">
          <li className="my-1">
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noreferrer"
            >
              OpenWeather:
            </a>
            <span className="text-gray-500 ml-2">Free Weather API</span>
          </li>
          <li className="my-1">
            <a
              href="https://gitlab.com/amatos/rest-countries"
              target="_blank"
              rel="noreferrer"
            >
              Rest Countries:
            </a>
            <span className="text-gray-500 ml-2">Free Countries API</span>
          </li>
          <li className="my-1">
            <a
              href="https://www.uplabs.com/posts/weather-app-concept-2a0bffaa-9b9b-4c55-a0e4-8b96dc3cb73c"
              target="_blank"
              rel="noreferrer"
            >
              Alver Hothasi:
            </a>
            <span className="text-gray-500 ml-2">
              Figma Design and resources
            </span>
          </li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default AcknowledgmentPage;
