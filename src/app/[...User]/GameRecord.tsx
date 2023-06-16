"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Commons/Loading";
import ReadMore from "./Commons/ReadMore";

interface props {
  userIntell: string[];
}

const GameRecord: React.FC<props> = ({ userIntell }) => {
  const [detailMatchDataArray, setDetailMatchData] = useState<any>();
  const [defaultLimit, setDefaultLimit] = useState<number>(12);
  const [selected, setSelected] = useState<number | null>(null);
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  const DEFAULT_MATCH_TYPE = 50; //공식경기의 ID === 50
  const INCREASE_NUMBER = 12;

  const findUserController = (controllerType: string) => {
    if (controllerType === "keyboard") {
      return "키보드";
    } else if (controllerType === "패드") {
      return "패드";
    } else {
      return "기타";
    }
  };

  const toggle = (index: any) => {
    setSelected(selected === index ? null : index);
  };

  const searchUserMatchData = async (userAccessId: string) => {
    const res = await axios(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users/${userAccessId}/matches?matchtype=${DEFAULT_MATCH_TYPE}&offset=0&limit=100`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_FIFAONLINE_API_KEY,
        },
      }
    );

    const tasks = [];
    if (defaultLimit <= res.data.length) {
      for (let i = 0; i < defaultLimit; i++) {
        const task = axios(
          `https://api.nexon.co.kr/fifaonline4/v1.0/matches/${res.data[i]}`,
          {
            method: "GET",
            headers: {
              Authorization: process.env.NEXT_PUBLIC_FIFAONLINE_API_KEY,
            },
          }
        );
        tasks.push(task);
      }
      await Promise.all(tasks).then((result) => {
        setDetailMatchData(result);
        setIsReadMore(true);
      });
    } else {
      alert(
        "더 이상 데이터를 불러올 수 없습니다.(경기는 최대 100경기까지 불러올 수 있습니다.)"
      );
    }
  };

  const onClick = () => {
    setDefaultLimit(defaultLimit + INCREASE_NUMBER);
    setIsReadMore(false);
  };

  useEffect(() => {
    searchUserMatchData(userIntell[0]);
  }, [userIntell, defaultLimit]);

  return (
    <div className=" mt-2.5 w-full">
      {detailMatchDataArray ? (
        detailMatchDataArray.map((item: any, index: number) => (
          <div key={index} className="flex flex-col items-center w-full ">
            <div
              className="flex h-32 justify-around rounded-2xl bg-teal-500 mt-3 w-2/3 cursor-pointer hover:bg-teal-600 shadow-lg shadow-sky-500/40 opacity-90"
              onClick={() => toggle(index)}
            >
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-xl font-semibold mx-2">
                  {item.data.matchDate.substr(0, 10)}
                </h1>
                <h1 className="text-white text-l font-semibold mx-2">
                  {item.data.matchDate.substr(11, 12)}
                </h1>
              </div>

              {item.data.matchInfo.map((secItem: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-0 m-0 shrink"
                >
                  <p className="text-gray-800 font-semibold">
                    {secItem.nickname}
                  </p>
                  <h1 className="text-yellow-300 font-bold text-4xl">
                    {secItem.shoot.goalTotal}
                  </h1>
                </div>
              ))}
              {/* ↑대략적인 경기내용 ↓세부 경기내용 */}
              <div className="flex items-center justify-items-end">
                {selected === index ? "-" : "+"}
              </div>
            </div>
            <div
              className={
                selected === index
                  ? "w-2/3 flex max-h-full"
                  : "max-h-0 overflow-hidden"
              }
              onClick={() => toggle(index)}
            >
              {item.data.matchInfo.map((secItem: any, index: number) => (
                <table
                  key={index}
                  className="w-full bg-white border border-gray-300 rounded-lg shadow-sm mb-4"
                >
                  <thead>
                    <tr>
                      <th
                        colSpan={2}
                        className="py-3 px-6 bg-gray-100 border-b border-gray-300 text-lg font-medium text-gray-700"
                      >
                        {secItem.nickname}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        평균 평점
                      </th>
                      <td className="py-2 px-6">
                        {secItem.matchDetail.averageRating
                          .toString()
                          .substr(0, 3)}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        점유율
                      </th>
                      <td className="py-2 px-6">
                        {secItem.matchDetail.possession}%
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        슈팅
                      </th>
                      <td className="py-2 px-6">{secItem.shoot.shootTotal}</td>
                    </tr>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        유효 슈팅
                      </th>
                      <td className="py-2 px-6">
                        {secItem.shoot.effectiveShootTotal}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        패스 시도
                      </th>
                      <td className="py-2 px-6">{secItem.pass.passTry}</td>
                    </tr>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        패스 성공률
                      </th>
                      <td className="py-2 px-6">
                        {Math.ceil(
                          (secItem.pass.passSuccess / secItem.pass.passTry) *
                            100
                        )}
                        %
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 px-6 font-medium text-gray-600">
                        컨트롤러 타입
                      </th>
                      <td className="py-2 px-6">
                        {findUserController(secItem.matchDetail.controller)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
      <div className="w-full flex justify-center">
        {isReadMore ? (
          <div
            onClick={onClick}
            className="w-2/3 h-14 bg-gray-200 hover:bg-gray-300 mt-3 rounded-xl flex flex-col justify-center"
          >
            <ReadMore />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default GameRecord;
