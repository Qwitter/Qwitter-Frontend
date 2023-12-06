import { UserContext } from "@/contexts/UserContextProvider";
import { MuteService, UnMuteService } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { toast } from "../ui/use-toast";

export type MuteButtonProp = {
  username: string;
};
export function MuteButton({ username }: MuteButtonProp) {
  const { token } = useContext(UserContext);
  const { mutateAsync: MuteServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => MuteService(username, token)
      : undefined,
    onSuccess: () => {
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
      toast({
        title: "User unmuted successfully",
      });
    },
  });
  return (
    <>
      <GoMute color="red" onClick={() => MuteServiceFn(username)} />
      <GoUnmute color="black" onClick={() => unMuteServiceFn(username)} />
    </>
  );
}
