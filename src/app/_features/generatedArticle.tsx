"use client";
import { useEffect, useState } from "react";
import { Title } from "../_components/title";
import { PreIcon } from "../_icons/preIcon";
import { SummarizedIcon } from "../_icons/summarizedIcon";
import { ContextHistory } from "../_components/contentHistory";

type MyProps = {
  goPrev: () => void;
  takeTest: () => void;
};

type ArticleData = {
  id: string;
  content: string;
  title: string;
  summary: string;
};

export const GeneratedArticle = ({ goPrev, takeTest }: MyProps) => {
  const [state, setState] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  if (!articleData) return;
  const [quizData, setQuizData] = useState([]);

  const fetchData = async () => {
    const data = await (
      await fetch("/api/articles", {
        method: "GET",
      })
    ).json();
    setArticleData(data);
  };

  const fetchQuizData = async () => {
    if (!articleData) return;
    const data = await (
      await fetch(`/api/generate?articleId=${articleData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    setQuizData(data);
  };

  const quizGenerator = async () => {
    if (!articleData) return;
    setLoading(true);
    try {
      const data = await (
        await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            articleTitle: articleData.title,
            articleContent: articleData.content,
            articleId: articleData.id,
          }),
        })
      ).json();
      setQuiz(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchQuizData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-100 pt-12 items-center gap-6">
      <div className="flex justify-start w-[856px]">
        <button
          className="bg-white w-12 h-10 rounded-lg border border-zinc-200 cursor-pointer flex items-center justify-center"
          onClick={goPrev}
        >
          <PreIcon />
        </button>
      </div>
      <div className="w-[856px] min-h-[356px] bg-white border border-zinc-200 rounded-lg p-7 flex flex-col gap-5">
        <Title title="Article Quiz Generator" />
        <div className="flex flex-col gap-2 h-fit">
          <p className="flex items-center text-zinc-400 text-[14px] font-semibold gap-1">
            <SummarizedIcon />
            Summarized content
          </p>
          <p className="flex items-center text-black text-[24px] font-semibold gap-2">
            {articleData.title}
          </p>
          <div className="w-[800px] min-h-[120px] max-h-[252px] overflow-y-scroll text-[14px] font-normal text-black">
            {articleData.summary}
          </div>
        </div>
        <div className="flex w-[800px] justify-between items-center">
          <button
            className="w-[113px] h-10 border border-zinc-200 rounded-lg cursor-pointer flex justify-center items-center font-medium text-[14px] text-black"
            onClick={() => setState(true)}
          >
            See content
          </button>
          <button
            className="w-[108px] bg-black h-10 rounded-lg cursor-pointer flex justify-center items-center font-medium text-[14px] text-white"
            onClick={quizGenerator}
          >
            Take a quiz
          </button>
        </div>
      </div>
      {state && (
        <ContextHistory
          closeModal={() => setState(false)}
          content={articleData.content}
          title={articleData.title}
        />
      )}
    </div>
  );
};
