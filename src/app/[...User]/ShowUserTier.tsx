"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface props {
  userInfo: string[];
}

interface userRankData {
  divisionId: number;
  divisionName: string;
}

const ShowUserTier: React.FC<props> = ({ userInfo }) => {
  const [userPeakTier, setUserPeakTier] = useState<userRankData>();

  const getDivisionMetaData = async (userId: string) => {
    //등급 식별자 메타데이터를 가져온다.
    //메타데이더는 [{object}] 형식이다.
    const metaData = await axios(
      `https://static.api.nexon.co.kr/fifaonline4/latest/division.json`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_FIFAONLINE_API_KEY,
        },
      }
    );

    //유저의 최고등급점수를 가져온다
    const userRankData = await axios(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users/${userId}/maxdivision`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_FIFAONLINE_API_KEY,
        },
      }
    );

    const task = metaData.data;
    const peak = userRankData.data[0].division;
    const found = task.find((e: userRankData) => e.divisionId === peak);

    setUserPeakTier(found);
  };

  useEffect(() => {
    if (userInfo) {
      getDivisionMetaData(userInfo[0]);
    }
  }, [userInfo]);

  return (
    <div className="flex justify-center mt-2.5 w-full ">
      {userInfo && userPeakTier ? (
        <div className="flex justify-around shadow-lg shadow-indigo-500/40 opacity-90 rounded-2xl w-10/12 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="flex flex-col justify-center">
            <h1 className="font-semibold text-sky-100 text-5xl ">
              {userInfo[1]}
            </h1>
            <h1 className="font-semibold text-sky-100">레벨: {userInfo[2]}</h1>
          </div>
          <h1 className="font-medium text-sky-100 flex flex-col justify-center">
            최고 등급: {userPeakTier.divisionName}
          </h1>
        </div>
      ) : null}
    </div>
  );
};

export default ShowUserTier;
