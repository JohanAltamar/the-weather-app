import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Types
import type { NextPage } from "next";
// Layouts
import PageLayout from "../components/layouts/PageLayout";
// Icons
import { MdSearch } from "react-icons/md";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const cityRef = React.useRef<HTMLInputElement>(null);

  const handleGetWeather = (ev: React.FormEvent) => {
    ev.preventDefault();
    router.push(`/${cityRef.current?.value}`);
  };

  const bgUrl =
    "https://images.unsplash.com/photo-1559060017-445fb9722f2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  return (
    <PageLayout>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-300 h-screen -z-20">
        <div className={`max-w-sm mx-auto h-full`}>
          <figure className="w-[24rem] h-full fixed top-0 z-0 backdrop-blur-sm">
            <Image alt="background" src={bgUrl} layout="fill" />
          </figure>
          <main className="backdrop-blur-sm h-full w-full flex flex-col text-white">
            <h1 className="text-4xl text-center font-semibold my-20 mb-12">
              The Weather App
            </h1>
            <form
              onSubmit={handleGetWeather}
              className="p-8 w-full flex justify-center items-stretch"
            >
              <input
                className="border border-r-0 bg-black/10 rounded-l-lg rounded-r-none p-2 w-full placeholder:text-gray-500"
                placeholder="Enter a city"
                ref={cityRef}
              />
              <button
                className="w-10 border p-1 rounded-r-lg text-white"
                type="submit"
              >
                <MdSearch className="mx-auto" />
              </button>
            </form>
            <Link href={"/acknowledgment"}>
              <a className="text-center text-gray-200 mt-10">
                <small>Thanks to ...</small>
              </a>
            </Link>
          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
