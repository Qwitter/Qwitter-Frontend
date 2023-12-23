import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { BlockService, UnBlockService, cn } from "@/lib/utils";
import { WarningPopUp } from "../WarningPopUp/WarningPopUp";
import { UserContext } from "@/contexts/UserContextProvider";

export function BlockButton({
  username,
  onClick,
  className,
}: {
  username: string;
  onClick?: () => void;
  className?: string;
}) {
  const [state, setstate] = useState(true);
  const [showDialog, setshowDialog] = useState(false);
  const { token } = useContext(UserContext);
  const { mutateAsync: BlockServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => BlockService(username, token)
      : undefined,
  });
  const { mutateAsync: unBlockServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => UnBlockService(username, token)
      : undefined,
  });
  const handleBlockButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setshowDialog(true);
  };
  const handleunBlockButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await unBlockServiceFn(username);
    setstate(false);
    onClick && onClick();
  };
  const confirmBlockButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await BlockServiceFn(username);
    setstate(true);
    setshowDialog(false);
    onClick && onClick();
  };
  return (
    <>
      {state === true && (
        <Button
          onClick={handleunBlockButton}
          variant="destructive"
          className={cn(
            "text-sm w-[100px] h-[30px] font-bold [&>*]:hover:before:content-['Unblock']",
            className
          )}
        >
          <span className="text-white before:content-['Blocked']"></span>
        </Button>
      )}
      {state === false && (
        <Button
          onClick={handleBlockButton}
          className={cn("text-sm w-[100px] h-[30px] font-bold", className)}
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
