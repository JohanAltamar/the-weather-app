import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Types
import type { NextPage } from "next";
// Layouts
import PageLayout from "../../components/layouts/PageLayout";
// Icons
import { MdSearch } from "react-icons/md";

const City: NextPage = () => {
  const router = useRouter();
  const cityRef = React.useRef<HTMLInputElement>(null);

  const handleGetWeather = (ev: React.FormEvent) => {
    ev.preventDefault();
    router.push(`/${cityRef.current?.value}`);
  };

  return (
    <PageLayout wrapperClassName="bg-gray-300">
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="global-padding h-full flex flex-col ">
        <form
          onSubmit={handleGetWeather}
          className="h-10 self-center flex items-stretch"
        >
          <input
            className="border border-r-0"
            placeholder="Enter a city"
            ref={cityRef}
          />
          <button className="w-10 border p-1" type="submit">
            <MdSearch className="mx-auto" />
          </button>
        </form>

        <section className="my-4">
          <header className="text-center text-xl font-semibold">
            {router.query.city} Weather Info
          </header>
          <section></section>
        </section>
      </div>
    </PageLayout>
  );
};

export default City;
