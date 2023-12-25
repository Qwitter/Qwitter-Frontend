import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tweet } from "@/models/Tweet";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { UserContext } from "@/contexts/UserContextProvider";
import DeleteTweetPopUp from "../DeleteTweetPopUp/DeleteTweetPopUp";
import { Ban, UserPlus, UserX, Volume, VolumeX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WarningPopUp } from "../WarningPopUp/WarningPopUp";
import {
  BlockService,
  FollowService,
  MuteService,
  UnBlockService,
  UnFollowService,
  UnMuteService,
  cn,
} from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";

type TweetOptionsMenuProps = {
  author: Tweet["author"];
  isFollowing: boolean;
  isMuted: boolean;
  tweetId?: string;
  className?: string;
  linkClassName?: string;
};

const TweetOptionsMenu = ({
  author,
  isFollowing,
  tweetId,
  isMuted,
  className,
  linkClassName = "",
}: TweetOptionsMenuProps) => {
  const { user } = useContext(UserContext);
  const [isFollowingClone, setIsFollowingClone] =
    useState<boolean>(isFollowing);
  const [isMutedClone, setIsMutedClone] = useState<boolean>(isMuted);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dialogType, setDialogType] = useState<"unFollow" | "block">(
    "unFollow"
  );

  useEffect(() => {
    setIsFollowingClone(isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    setIsMutedClone(isMuted);
  }, [isMuted]);

  const { mutateAsync: FollowServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => FollowService(username, token)
      : undefined,
  });

  const { mutateAsync: unFollowServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => UnFollowService(username, token)
      : undefined,
  });

  const handleFollowButton = async () => {
    await FollowServiceFn(author.userName);

    queryClient.invalidateQueries({
      queryKey: ["profile", token, author.userName],
    });

    console.log(author.userName);

    queryClient.invalidateQueries({
      queryKey: ["tweet", tweetId],
    });

    queryClient.invalidateQueries({
      queryKey: ["tweets"],
    });
  };

  const handleUnFollowButton = () => {
    setDialogType("unFollow");
    setShowDialog(true);
  };

  const confirmUnFollowButton = async () => {
    await unFollowServiceFn(author.userName);

    queryClient.invalidateQueries({
      queryKey: ["tweet", tweetId],
    });

    queryClient.invalidateQueries({
      queryKey: ["tweets"],
    });

    queryClient.invalidateQueries({
      queryKey: ["profile", token, author.userName],
    });

    console.log(author.userName);

    setShowDialog(false);
  };

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

  const handleBlockButton = () => {
    setDialogType("block");
    setShowDialog(true);
  };

  const handleunBlockButton = async () => {
    await unBlockServiceFn(author.userName);
    navigate("/home");

    await queryClient.invalidateQueries({
      queryKey: ["tweets"],
    });

    queryClient.invalidateQueries({
      queryKey: ["profile", token, author.userName],
    });
  };

  const confirmBlockButton = async () => {
    await BlockServiceFn(author.userName);

    await queryClient.invalidateQueries({
      queryKey: ["tweets"],
    });

    queryClient.invalidateQueries({
      queryKey: ["profile", token, author.userName],
    });

    setShowDialog(false);

    navigate("/home");
  };

  const { mutateAsync: MuteServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => MuteService(username, token)
      : undefined,
    onMutate: () => {
      setIsMutedClone(true);
    },
    onSuccess: () => {
      toast({
        title: "User muted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", token, author.userName],
      });
    },
  });

  const { mutateAsync: unMuteServiceFn } = useMutation({
    mutationFn: token
      ? (username: string) => UnMuteService(username, token)
      : undefined,
    onMutate: () => {
      setIsMutedClone(false);
    },
    onSuccess: () => {
      toast({
        title: "User unmuted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", token, author.userName],
      });
    },
  });

  return (
    <Link to="#" className={linkClassName}>
      <DropdownMenu>
        <DeleteTweetPopUp
          tweetId={tweetId!}
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
        />
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "ml-auto ring-0 focus-visible:ring-0 hover:bg-secondary hover:bg-opacity-20 text-gray hover:text-secondary p-1 outline-none ease-in-out duration-200",
              className
            )}
            data-testid="MoreOptions"
          >
            <HiOutlineDotsHorizontal className="cursor-pointer text-xl rounded-full ease-in-out duration-200 outline-none" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 mr-48 bg-black">
          {user && user.userName === author.userName ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-danger gap-4 items-center font-bold p-2"
                onClick={() => setShowDeleteDialog(true)}
                data-testid="DeleteTweet"
              >
                <FiTrash2 className="text-lg" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup className="gap-4">
              {isFollowingClone ? (
                <DropdownMenuItem
                  className="gap-4 items-center font-bold p-2"
                  data-testid="followUnfollow"
                  onClick={() => handleUnFollowButton()}
                >
                  <UserX className="text-lg" />
                  Unfollow @{author.userName}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="gap-4 items-center font-bold p-2"
                  data-testid="followUnfollow"
                  onClick={() => handleFollowButton()}
                >
                  <UserPlus className="text-lg" />
                  Follow @{author.userName}
                </DropdownMenuItem>
              )}
              {isMutedClone ? (
                <DropdownMenuItem
                  className="gap-4 items-center font-bold p-2"
                  data-testid="muteUnmute"
                  onClick={(event) => {
                    event.stopPropagation();
                    unMuteServiceFn(author.userName);
                  }}
                >
                  <Volume className="text-lg" />
                  Unmute @{author.userName}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="gap-4 items-center font-bold p-2"
                  data-testid="muteUnmute"
                  onClick={(event) => {
                    event.stopPropagation();
                    MuteServiceFn(author.userName);
                  }}
                >
                  <VolumeX className="text-lg" />
                  Mute @{author.userName}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="gap-4 items-center font-bold p-2"
                onClick={() => handleBlockButton()}
              >
                <Ban className="text-lg" />
                Block @{author.userName}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <WarningPopUp
        headerFunction={() => {
          setShowDialog(false);
        }}
        data-testid="UnfollowPopUp"
        UserAction={dialogType === "unFollow" ? "Unfollow" : "Block"}
        username={author.userName}
        PopUpshow={showDialog}
        ButtonVariant={dialogType === "unFollow" ? "default" : "destructive"}
        ButtonFunc={
          dialogType === "unFollow" ? confirmUnFollowButton : confirmBlockButton
        }
        desc={
          dialogType === "unFollow"
            ? "Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from ${author.userName}.`
        }
      />
    </Link>
  );
};

export default TweetOptionsMenu;
