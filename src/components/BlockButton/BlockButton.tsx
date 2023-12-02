import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { BlockService, UnBlockService } from "@/lib/utils";
import { WarningPopUp } from "../WarningPopUp/WarningPopUp";
import { BlockButtonProp } from "./BlockButtonProp";

export function BlockButton({ username, isBlocked }: BlockButtonProp) {
  const [state, setstate] = useState(isBlocked);
  const [showDialog, setshowDialog] = useState(false);
  const {
    mutateAsync: BlockServiceFn,
    // isPending: FollowServicePending,
  } = useMutation({
    mutationFn: BlockService,
  });
  const {
    mutateAsync: unBlockServiceFn,
    // isPending: FollowServicePending,
  } = useMutation({
    mutationFn: UnBlockService,
  });
  const handleBlockButton = () => {
    setshowDialog(true);
  };
  const handleunBlockButton = () => {
    unBlockServiceFn(username);
    setstate(false);
  };
  const confirmBlockButton = () => {
    BlockServiceFn(username);
    setstate(true);
    setshowDialog(false);
  };
  return (
    <>
      {state === true && (
        <Button
          onClick={handleunBlockButton}
          variant="destructive"
          className="text-sm w-[100px] h-[30px] font-bold"
        >
          <span className="text-white">Blocked</span>
        </Button>
      )}
      {state === false && (
        <Button
          onClick={handleBlockButton}
          className="text-sm w-[100px] h-[30px] font-bold"
          variant={"danger"}
        >
          <span className="text-danger">Block</span>
        </Button>
      )}
      <WarningPopUp
        headerFunction={() => {
          setshowDialog(false);
        }}
        UserAction="Block"
        username={username}
        PopUpshow={showDialog}
        ButtonVariant={"destructive"}
        ButtonFunc={confirmBlockButton}
        desc={`They will not be able to follow you or view your posts,
         and you will not see posts or notifications from ${username}.`}
      />
    </>
  );
}
