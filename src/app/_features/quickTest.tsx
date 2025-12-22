"use client";
import { useState } from "react";
import { Title } from "../_components/title";
import { ExitIcon } from "../_icons/exitIcon";
import { RestartQuiz } from "../_components/restartQuiz";

type MyProps = {
  seeResult: () => void;
};

export const QuickTest = ({ seeResult }: MyProps) => {
  const [restartQuizState, setRestartQuizState] = useState(false);
  return (
    <div className="w-full h-full bg-zinc-100 flex justify-center pt-[120px]">
      <div className="w-[558px] h-72 gap-5 flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Title title="Quick test" />
            <p className="text-[16px] font-medium text-zinc-400">
              Take a quick test about your knowledge from your content
            </p>
          </div>
          <button
            className="bg-white w-12 h-10 border border-zinc-200 rounded-lg cursor-pointer flex items-center justify-center"
            onClick={() => setRestartQuizState(true)}
          >
            <ExitIcon />
          </button>
          {restartQuizState && (
            <RestartQuiz goBack={() => setRestartQuizState(false)} />
          )}
        </div>
        <div className="bg-white w-[558px] h-[200px] rounded-lg border border-zinc-200 p-7 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-black text-[20px] font-medium">
              What was Genghis Khan’s birth name?
            </p>
            <p className="text-[20px] text-black font-medium flex gap-1 items-baseline">
              1
              <span className="text-[16px] text-zinc-400 font-medium">/ 5</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-y-4">
            <button
              className="w-[243px] h-10 rounded-lg border border-zinc-200 flex cursor-pointer justify-center items-center text-black text-[14px] font-medium"
              onClick={seeResult}
            >
              Yesugei
            </button>
            <button className="w-[243px] h-10 rounded-lg border border-zinc-200 flex cursor-pointer justify-center items-center text-black text-[14px] font-medium">
              Yesugei
            </button>
            <button className="w-[243px] h-10 rounded-lg border border-zinc-200 flex cursor-pointer justify-center items-center text-black text-[14px] font-medium">
              Yesugei
            </button>
            <button className="w-[243px] h-10 rounded-lg border border-zinc-200 flex cursor-pointer justify-center items-center text-black text-[14px] font-medium">
              Yesugei
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
