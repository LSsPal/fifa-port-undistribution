import HeaderLogo from "./HeaderLogo";
import SearchBar from "../SearchBar";

const HeaderBar = () => {
  return (
    <header className="flex justify-around items-start pt-5">
      <div className="text-gray-800 font-black items-start text-7xl ">
        <HeaderLogo />
      </div>
      <SearchBar />
    </header>
  );
};

export default HeaderBar;
