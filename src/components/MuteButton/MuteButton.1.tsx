import { UserContext } from "@/contexts/UserContextProvider";
import { MuteService, UnMuteService } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { MuteButtonProp } from "./MuteButton";

export function MuteButton({ username }: MuteButtonProp) {
  const [state, setState] = useState("Muted");
  const { token } = useContext(UserContext);
  const { mutateAsync: MuteServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => MuteService(username, token)
      : undefined,
    onSuccess: () => {
      setState("Muted");
      toast({
        title: "User muted successfully",
      });
    },
  });
  const { mutateAsync: unMuteServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => UnMuteService(username, token)
      : undefined,
    onSuccess: () => {
      setState("UnMuted");
      toast({
        title: "User unmuted successfully",
      });
    },
  });
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* {state == "Muted" ? (
              <Button variant={"danger"} onClick={() => unMuteServiceFn(username)}>
                <GoUnmute className="rounded-full w-[20px] h-[20px]"></GoUnmute>
              </Button>
            ) : (
              <Button variant={"secondary"} onClick={() => MuteServiceFn(username)}>
                <GoMute className="rounded-full w-[20px] h-[20px]"></GoMute>
              </Button>
            )} */}
    </>
  );
}
