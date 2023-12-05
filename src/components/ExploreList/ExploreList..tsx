import { TrendList } from "../TrendList/TrendList";

export function ExploreList() {
  return (
    <>
      <div className="max-w-[600px] w-full h-full flex-grow border-r border-primary border-opacity-30 ">
        <TrendList isCard={false} />
      </div>
    </>
  );
}
