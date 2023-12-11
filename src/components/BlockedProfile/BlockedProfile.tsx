import { Button } from "../ui/button";

export function BlockedProfile({ username }: { username: string }) {
  return (
    <>
      <div className="w-full mt-10">
        <div className="w-[360px] mx-auto">
          <h1 className="font-bold mb-5 text-2xl">@{username} is blocked</h1>
          <div className="text-gray mb-5">
            Are you sure you want to view these posts? Viewing posts won’t
            unblock @{username}.
          </div>
          <Button className="w-[155px] h-[50px]" variant={"secondary"}>
            View Posts
          </Button>
        </div>
      </div>
    </>
  );
}
