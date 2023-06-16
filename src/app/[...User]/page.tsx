"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import HeaderBar from "./Commons/HeaderBar";
import ShowUserTier from "./ShowUserTier";
import GameRecord from "./GameRecord";

const FifaPage: NextPage<{ params: { User: string[] } }> = ({ params }) => {
  //userData[0] = 유저 고유아이디
  //userData[1] = 유저 닉네임
  //userData[2] = 유저 레벨
  const [userData, setUserData] = useState<string[]>();
  const [isParamsRender, setIsParamsRender] = useState<boolean>(true);

  useEffect(() => {
    if (isParamsRender) {
      setIsParamsRender(false);
      const decodeUserData = params.User.map((item) => decodeURI(item));
      setUserData(decodeUserData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isParamsRender]);

  return (
    <main className="bg-slate-200">
      {userData ? (
        <div>
          <HeaderBar />
          <ShowUserTier userInfo={userData} />
          <GameRecord userIntell={userData} />
        </div>
      ) : null}
    </main>
  );
};

export default FifaPage;
