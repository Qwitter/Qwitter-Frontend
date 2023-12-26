import { Route, Routes, useLocation } from "react-router-dom";
import { ExploreList } from "./ExploreList.";
import { ExploreSearch } from "@/pages/Explore/ExploreSearch";

export function Explore() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 max-sm:w-[280px]">
        <Routes location={previousLocation || location}>
          <Route index path="/" element={<ExploreList />} />
          <Route path="/Search/*" element={<ExploreSearch />} />
        </Routes>
      </div>
    </>
  );
}
