import { UserContext } from "@/contexts/UserContextProvider";
import { MuteService, UnMuteService } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export type MuteButtonProp = {
  username: string;
};
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
      {state == "Muted" ? (
        <HoverCard>
          <HoverCardTrigger>
            <Button
              variant={"danger"}
              onClick={(event) => {
                event.stopPropagation();
                unMuteServiceFn(username);
              }}
            >
              <GoMute className="rounded-full w-[20px] h-[20px]"></GoMute>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-[100px]">unmute</HoverCardContent>
        </HoverCard>
      ) : (
        <HoverCard>
          <HoverCardTrigger>
            <Button
              className="cursor-pointer"
              variant={"secondary"}
              onClick={(event) => {
                event.stopPropagation();
                MuteServiceFn(username);
              }}
            >
              <GoUnmute className="rounded-full w-[20px] h-[20px]"></GoUnmute>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-[100px]">mute</HoverCardContent>
        </HoverCard>
      )}
    </>
  );
}
