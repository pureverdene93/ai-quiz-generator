"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Title } from "@/app/_components/title";
import { PreButton } from "../_components/preButton";
import { SummarizedIcon } from "@/app/_icons/summarizedIcon";
import { ArticleIcon } from "@/app/_icons/articleIcon";
import { ContextHistory } from "@/app/_components/contentHistory";
import { useRouter } from "next/navigation";

type Article = {
  title: string;
  content: string;
  summary: string;
}[];

export const Contents = () => {
  const [articleData, setArticleData] = useState<Article | []>([]);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const fetchData = async () => {
    try {
      const data = await (
        await fetch(`/api/article?articleId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setArticleData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const quizGenerator = async () => {
    const artcile = articleData[0];
    if (!artcile) return;
    console.log(artcile, "i use this");
    setLoading(true);
    try {
      const data = await (
        await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            articleTitle: artcile.title,
            articleContent: artcile.content,
            articleId: id,
          }),
        })
      ).json();
      setQuizData(data);
      router.push(`/quizzes/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(quizData, "quiz data is here");

  useEffect(() => {
    fetchData();
  }, [id]);
  console.log(articleData, "this is article data");

  return (
    <div className="w-full h-full flex flex-col items-center bg-zinc-100 pt-12 gap-6">
      <div className="w-[628px] flex justify-start">
        <PreButton />
      </div>
      <div className="w-[628px] h-fit max-h-[600px] bg-white rounded-lg flex flex-col p-7 border border-zinc-200 gap-5">
        <Title title="Article Quiz Generator" />
        <div className="flex flex-col gap-2">
          <p className="flex items-center text-zinc-400 text-[14px] font-semibold gap-1">
            <SummarizedIcon />
            Summarized content
          </p>
          {articleData.map((data, index) => {
            return (
              <p className="text-[24px] font-semibold text-black" key={index}>
                {data.title}
              </p>
            );
          })}
          {articleData.map((data, index) => {
            return (
              <div
                className="max-h-[168px] h-fit text-black font-normal text-[14px] overflow-y-scroll"
                key={index}
              >
                {data.summary}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex items-center text-zinc-400 text-[14px] font-semibold gap-1">
            <ArticleIcon />
            Article content
          </p>
          {articleData.map((data, index) => {
            return (
              <div
                className="text-black font-normal text-[14px] h-[60px] overflow-hidden line-clamp-3"
                key={index}
              >
                {data.content}
              </div>
            );
          })}
          <div className="w-full h-fit flex justify-end">
            <button
              className="w-24 h-7 cursor-pointer flex justify-center items-center text-black font-medium text-[14px] bg-transparent"
              onClick={() => setState(true)}
            >
              See more
            </button>
            {state &&
              articleData.map((data, index) => {
                return (
                  <ContextHistory
                    closeModal={() => setState(false)}
                    content={data.content}
                    title={data.title}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
        <button
          className="w-[124px] h-10 bg-black rounded-lg text-white cursor-pointer flex items-center justify-center text-[14px] font-medium"
          onClick={quizGenerator}
        >
          Take a quiz
        </button>
      </div>
    </div>
  );
};
