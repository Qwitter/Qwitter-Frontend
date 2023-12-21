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
import { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { UserContext } from "@/contexts/UserContextProvider";
import DeleteTweetPopUp from "../DeleteTweetPopUp/DeleteTweetPopUp";
import { Ban, UserPlus, UserX, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

type TweetOptionsMenuProps = {
  tweet: Tweet;
};

const TweetOptionsMenu = ({ tweet }: TweetOptionsMenuProps) => {
  const { user } = useContext(UserContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <Link to="#">
      <DropdownMenu>
        <DeleteTweetPopUp
          tweetId={tweet.id}
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
        />
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto ring-0 hover:bg-secondary hover:bg-opacity-20 p-1 outline-0 ease-in-out duration-200"
            data-testid="MoreOptions"
          >
            <HiOutlineDotsHorizontal className="cursor-pointer text-xl rounded-full text-gray hover:text-secondary ease-in-out duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 mr-48 bg-black">
          {user && user.userName === tweet.author.userName ? (
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
              <DropdownMenuItem className="gap-4 items-center font-bold p-2">
                <UserPlus className="text-lg" />
                Follow @{tweet.author.userName}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-4 items-center font-bold p-2">
                <UserX className="text-lg" />
                Unfollow @{tweet.author.userName}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-4 items-center font-bold p-2">
                <VolumeX className="text-lg" />
                Mute @{tweet.author.userName}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-4 items-center font-bold p-2">
                <Ban className="text-lg" />
                Block @{tweet.author.userName}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
};

export default TweetOptionsMenu;
