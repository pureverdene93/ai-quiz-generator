"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

type Article = {
  title: string;
  id: string;
};

export const GeneratorHistoy = () => {
  const router = useRouter();
  const [articleData, setArticleData] = useState<Article[]>([]);
  const fetchData = async () => {
    try {
      const data = await (
        await fetch(`/api/getArticlesByUserId?userId=test1`, {
          method: "GET",
        })
      ).json();
      setArticleData(data.articles);
    } catch (err) {
      console.error(err, "client error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="font-normal text-[14px] text-zinc-400">Today</p>
        {articleData.map((data, index) => {
          return (
            <button
              className="font-medium text-[16px] text-black w-[268px] text-start justify-start flex pl-2 cursor-pointer"
              key={index}
              onClick={() => router.push(`/history/${data.id}`)}
            >
              {data.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
