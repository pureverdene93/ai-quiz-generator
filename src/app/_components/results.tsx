import { WrongIcon } from "../_icons/wrongIcon";

export const Results = () => {
  return (
    <div className="w-full flex gap-3">
      <WrongIcon />
      <div className="flex flex-col gap-0.5">
        <p className="text-[12px] text-zinc-400 font-medium">
          1. What was Genghis Khan’s birth name?
        </p>
        <p className="text-[12px] text-black font-medium">
          Your answer: Toghrul
        </p>
        <p className={`text-[12px] text-green-400 font-medium`}>
          Correct: Temüjin
        </p>
      </div>
    </div>
  );
};
