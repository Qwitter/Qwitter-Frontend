import { UserContext } from "@/contexts/UserContextProvider";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { deleteTweet } from "@/lib/utils";
import { toast } from "../ui/use-toast";

type DeleteTweetPopUpProps = {
  tweetId: string;
  showDeleteDialog: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
const DeleteTweetPopUp = ({
  tweetId,
  showDeleteDialog,
  setShowDeleteDialog,
}: DeleteTweetPopUpProps) => {
  const queryClient = useQueryClient();
  const { token } = useContext(UserContext);
  const { mutate: deleteTweetMutation, isPending } = useMutation({
    mutationFn: token
      ? (tweetId: string) => deleteTweet(tweetId, token)
      : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      setShowDeleteDialog(false);
      toast({
        title: "Tweet deleted successfully",
      });
    },
    onError: (err) => {
      toast({
        title: "Error deleting tweet",
        description: err.message,
      });
    },
  });

  return (
    <PopUpContainer
      show={showDeleteDialog}
      isCompact
      className="w-auto h-auto text-left px-8 pt-6 pb-7 mx-auto max-w-sm max-sm:px-8"
      dialogClassName="max-sm:max-w-sm"
    >
      <h2 className="font-bold text-xl self-start">Delete post ?</h2>
      <p className="text-gray mt-2 mb-4">
        This can’t be undone and it will be removed from your profile, the
        timeline of any accounts that follow you, and from search results.{" "}
      </p>
      <div className="flex flex-col gap-4 w-full">
        <Button
          variant="destructive"
          size="full"
          onClick={() => {
            deleteTweetMutation(tweetId);
          }}
          disabled={isPending}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          size="full"
          onClick={() => {
            setShowDeleteDialog(false);
          }}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </PopUpContainer>
  );
};
export default DeleteTweetPopUp;
