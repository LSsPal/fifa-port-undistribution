"use client";

import SportNews from "./[...User]/Commons/SportNews";
import HeaderLogo from "./[...User]/Commons/HeaderLogo";
import SearchBar from "./[...User]/SearchBar";

const Home = () => {
  return (
    <main className="bg-[url('/son.jpg')] w-full h-screen bg-no-repeat bg-cover">
      <header className="text-red-50 font-black text-8xl flex justify-center pt-8">
        <HeaderLogo />
      </header>
      <article>
        <div className=" mt-28 flex justify-center  ">
          <SearchBar />
        </div>
        <SportNews />
      </article>
      <footer className="absolute inset-x-0 bottom-0 font-medium flex justify-center">
        Data based on NEXON DEVELOPERS
      </footer>
    </main>
  );
};

export default Home;
