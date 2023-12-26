export const ProfileInvalid = () => {
  return (
    <div className="max-w-[400px] w-full pt-14 px-5 my-8 mx-auto px-auto flex flex-col">
      <div className="mb-2 text-3xl font-extrabold ">
        This account doesn’t exist
      </div>
      <div className="text-sm text-gray">Try searching for another.</div>
    </div>
  );
};
