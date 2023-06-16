"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [userName, setUserName] = useState<string>("");
  const [userLevel, setUserLevel] = useState<number>();
  const [userAccessId, setUserAccessId] = useState<string>();

  const router = useRouter();

  const getUserData = async (nickname: string) => {
    const res = await axios(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${nickname}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_FIFAONLINE_API_KEY,
        },
      }
    );

    setUserLevel(res.data.level);
    setUserAccessId(res.data.accessId);
  };

  useEffect(() => {
    if (userName || userLevel || userAccessId) {
      router.push(`/${userAccessId}/${userName}/${userLevel}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccessId]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await getUserData(userName);
  };

  return (
    <form onSubmit={onSubmit} className=" ">
      <input
        type="text"
        className="text-2xl p-0 text-center  focus:outline-none  font-semibold rounded-3xl  opacity-50 border-solid h-20  backdrop-opacity-10 backdrop-invert placeholder:italic focus:placeholder-opacity-0"
        placeholder="닉네임을 입력해주세요"
        onChange={onChange}
      ></input>
    </form>
  );
};

export default SearchBar;
