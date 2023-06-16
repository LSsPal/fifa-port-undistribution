import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src="/spinner.gif" alt="loading..." width={70} height={70}></Image>
      <h1>데이터를 불러오는 중입니다..</h1>
    </div>
  );
};

export default Loading;
