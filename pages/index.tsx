import Head from "next/head";
import { useState } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({
  weight: ["400", "900", "600", "500"],
  display: "swap",
  subsets: ["latin"],
});

import { MdOutlineContentCopy } from "react-icons/md";

export default function Home() {
  const [promptValue, setPromptValue] = useState("");
  const [generated, setGenerated] = useState("");
  const [loader, setLoader] = useState("Generate");

  const prompt = `I will give a sentence, please correct it or rewrite it, the sentence is: "${promptValue}"`;

  const generating = async () => {
    setLoader("Generating...");
    const res = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setGenerated(data.choices[0].text);
    confetti();
    setLoader("Generate");
  };

  const copingText = (value: string) => {
    navigator.clipboard.writeText(value);
    toast("✅ Copied");
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${inter.className} flex flex-col items-center w-full max-w-[1200px] mx-auto p-4`}
      >
        <h1 className="font-black text-6xl text-center mt-24 mb-4">
          Grammar AI
        </h1>
        <p className="mb-24 text-base md:text-xl font-medium opacity-75 text-center">
          This application makes it easy for users to improve their writing and
          avoid common mistakes.
        </p>
        <textarea
          className="border-2 outline-none border-gray-500 focus:border-black rounded-lg p-4 w-full md:w-4/5 lg:w-1/2"
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
          placeholder="e.g: I okay am"
        />
        <p className="w-full md:w-4/5 lg:w-1/2 text-sm opacity-70 mt-1">
          It is either going to rewrite it or correct it.
        </p>
        <button
          onClick={generating}
          className={`bg-black text-white w-full md:w-4/5 lg:w-1/2 rounded-lg py-2 my-5 ${
            loader == "Generating..." && "animate-pulse"
          }`}
        >
          {loader}
        </button>

        {generated.length !== 0 && (
          <div className="w-full h-screen fixed top-0 left-0 bg-white bg-opacity-80 flex justify-center items-center">
            <div className="bg-white w-full max-w-[800px] shadow-2xl p-4 rounded-lg overflow-hidden border-2 border-gray-200">
              <h2 className="font-medium text-2xl my-4 mt-6">Your Sentence</h2>
              <motion.p
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-200 p-4 rounded-md"
              >
                {promptValue}
              </motion.p>
              <h2 className="font-medium text-2xl my-4 mt-6">
                Generated Sentence
              </h2>
              <motion.p
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-black text-white p-4 rounded-md"
              >
                {generated}
              </motion.p>
              <button
                onClick={() => copingText(generated)}
                className="bg-black text-white p-4 rounded-md mt-8 focus:bg-green-700 duration-100"
              >
                <MdOutlineContentCopy />
              </button>
              <Toaster />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
