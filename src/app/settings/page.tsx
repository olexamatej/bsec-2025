// pages/index.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from user preference or system setting
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <>
      <Head>
        <title>Dark/Light Mode Toggle</title>
        <meta
          name="description"
          content="Dark/Light Mode Toggle with Next.js and Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
            width: 100%;
            transition: background-color 2s, color 2s;
          }
          #__next {
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          `}
        </style>
      </Head>
      <div
        className={`flex h-full w-full flex-col items-center justify-center overflow-hidden transition-colors duration-100 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <main className="flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-bold">Everything is Purrrfect</h1>
          <div className="py-4">
            <img
              src="/dezo.png"
              alt="Cat image"
              className="max-w-xs rounded-lg shadow-lg"
            />
          </div>

          <button
            onClick={toggleDarkMode}
            className="transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 active:translate-y-0 active:shadow-md dark:focus:ring-blue-400"
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </main>
      </div>
    </>
  );
}
