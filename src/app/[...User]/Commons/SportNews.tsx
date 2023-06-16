"use client";

import { useEffect, useState } from "react";

const SportNews = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="flex justify-center opacity-90 mt-20">
      {domLoaded && (
        <div className="flex opacity-90  justify-around bg-red-50 flex-row gap-1 rounded-3xl border-4 border-red-200 border-solid w-128 p-1 hover:opacity-100">
          <a
            className="twitter-timeline"
            data-lang="ko"
            data-width="450"
            data-height="300"
            data-theme="light"
            href="https://twitter.com/FabrizioRomano?ref_src=twsrc%5Etfw"
          >
            Tweets by FabrizioRomano
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
          <>
            <iframe
              frameBorder="0"
              width="470"
              height="300"
              src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=Asia/Seoul&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=1&form=0&width=450&height=300&font=Arial&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"
            ></iframe>
          </>
        </div>
      )}
    </div>
  );
};

export default SportNews;
