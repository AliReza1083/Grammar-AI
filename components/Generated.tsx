import React from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { MdOutlineContentCopy } from "react-icons/md";

type Props = {
  promptValue: string;
  generated: string;
  setGenerated: (a: string) => void;
  copingText: (a: string) => void;
};

export default function Generated({
  promptValue,
  generated,
  setGenerated,
  copingText,
}: Props) {
  return (
    <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-full h-screen isolate">
      <motion.div
        {...framer_background}
        onClick={() => setGenerated("")}
        className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-[rgba(255,255,255,0.4)] -z-10"
      ></motion.div>
      <motion.div
        {...framer_modal}
        className="bg-white w-full max-w-[800px] shadow-2xl p-4 rounded-lg overflow-hidden border-2 border-gray-200"
      >
        <h2 className="my-4 mt-6 text-2xl font-medium">Your Sentence</h2>
        <p className="p-4 rounded-md bg-slate-200">{promptValue}</p>
        <h2 className="my-4 mt-6 text-2xl font-medium">Generated Sentence</h2>
        <p className="p-4 text-white bg-black rounded-md">{generated}</p>
        <button
          onClick={() => copingText(generated)}
          className="p-4 mt-8 text-white duration-100 bg-black rounded-md focus:bg-green-700"
        >
          <MdOutlineContentCopy />
        </button>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 9999,
            },
            position: "bottom-right",
          }}
        />
      </motion.div>
    </div>
  );
}

export const framer_background = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

export const framer_modal = {
  initial: { y: "5%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "5%", opacity: 0 },
  transition: { duration: 0.3 },
};
