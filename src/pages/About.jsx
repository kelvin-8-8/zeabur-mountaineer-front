import React from "react";
import Pics from "../components/Carousel";

export default function About() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(/Backpacks.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">關於我們</h1>
          <p className="mb-5 text-left leading-7">
          我們是一群熱愛冒險和探索自然的登山愛好者。<br />
          我們喜歡挑戰台灣壯麗的山岳，也熱衷於透過影像和故事，將大自然的美麗分享給更多人。
          <br />
          登山對我們來說，不僅是追求巔峰的過程，更是一種心靈的療癒與內在的探索。
          <br />
          如果你也熱愛登山，嚮往在山林中尋找自由的感覺，或者只是想認識一群同樣熱愛自然的人，歡迎你加入我們的行列！
          <br />
          讓我們一起發現台灣山岳的壯麗風光，創造更多美好的回憶！
          </p>
        </div>
      </div>
    </div>
  );
}
