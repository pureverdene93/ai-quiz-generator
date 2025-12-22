"use client";
import { Header } from "@/app/_features/header";
import { HistorySection } from "../_features/historySection";
export default function () {
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <HistorySection />
    </div>
  );
}
