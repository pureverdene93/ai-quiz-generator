import { Results } from "../_components/results";
import { Title } from "../_components/title";
import { BookMarkIcon } from "../_icons/bookMarkIcon";
import { RestartIcon } from "../_icons/restartIcon";

type MyProps = {
  backToHome: () => void;
  restart: () => void;
};

export const TestResult = ({ backToHome, restart }: MyProps) => {
  return (
    <div className="w-full h-full bg-zinc-100 flex flex-col gap-6 items-center pt-[120px]">
      <div className="flex flex-col w-[428px] h-16 justify-between">
        <Title title="Quiz completed" />
        <p className="text-[16px] text-zinc-400 font-medium">
          Let’s see what you did
        </p>
      </div>
      <div className="w-[428px] h-[528px] bg-white rounded-lg border border-zinc-200 p-7 flex flex-col gap-7">
        <p className="text-black text-[24px] font-medium">
          Your score: 2
          <span className="text-[16px] text-zinc-400 font-normal">/ 5</span>
        </p>
        <div className="flex flex-col justify-between h-[344px]">
          <Results />
          <Results />
          <Results />
          <Results />
          <Results />
        </div>
        <div className="w-full flex justify-between">
          <button
            className="w-44 h-10 border border-zinc-200 cursor-pointer flex justify-center items-center text-black font-medium rounded-lg gap-2"
            onClick={restart}
          >
            <RestartIcon /> Restart quiz
          </button>
          <button
            className="bg-black w-44 h-10 cursor-pointer flex justify-center items-center text-white font-medium rounded-lg gap-2"
            onClick={backToHome}
          >
            <BookMarkIcon /> Save and leave
          </button>
        </div>
      </div>
    </div>
  );
};
