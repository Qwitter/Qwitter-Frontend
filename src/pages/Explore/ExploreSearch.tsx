import {
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import SearchInput from "@/components/SearchInput/SearchInput";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { ExploreSearchTop } from "./ExploreSearchTop";
import { ExploreSearchPeople } from "./ExploreSearchPeople";
export function ExploreSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState(
    pathname
      .split("/")
      .filter((x) => x != "")
      .slice(-1)[0]
  );
  const openTab = (tabname: string) => {
    setActive(tabname);
    navigate(`/Explore/search/${tabname}/?q=${searchParams.get("q")}`);
  };

  return (
    <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
      <div className="sticky top-0 z-50 backdrop-blur-sm ">
        <div className="flex items-center justify-between px-4 py-2">
          <div
            className="hover:bg-[#191919] h-10  rounded-full transition-all p-2 cursor-pointer"
            data-testid="Back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <MoveLeft className="w-[20px] " />
          </div>
          <div className="w-[90%] mx-auto relative ">
            <SearchInput isSearchPage value={searchParams.get("q")!} />
          </div>
        </div>
        <div className="flex flex-row min-h-[50px] w-full sticky  top-[-1px]  z-50 border-b border-primary border-opacity-30">
          <div
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer "
            onClick={() => openTab("Top")}
          >
            <span
              className={`${
                active == "Top"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
              } text-base  `}
            >
              Top
            </span>
          </div>
          <div
            className="w-full  flex justify-center items-center  px-4 py-0 min-w-[56px]  hover:bg-[#181818] transition-all cursor-pointer "
            onClick={() => openTab("People")}
          >
            <span
              className={`${
                active == "People"
                  ? "text-primary border-b-4 font-bold py-3 border-solid border-secondary "
                  : "text-gray"
              } text-base  `}
            >
              People
            </span>
          </div>
        </div>
        <div className="border-b  border-primary border-opacity-30"></div>
      </div>
      <div>
        <Routes>
          <Route path="/Top" element={<ExploreSearchTop />} />
          <Route path="/people" element={<ExploreSearchPeople />} />
        </Routes>
      </div>
    </div>
  );
}
