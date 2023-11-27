import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuPortal,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tweet } from "@/models/Tweet";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { UserContext } from "@/contexts/UserContextProvider";

type TweetOptionsMenuProps = {
  tweet: Tweet;
};

const TweetOptionsMenu = ({ tweet }: TweetOptionsMenuProps) => {
  const { user } = useContext(UserContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <PopUpContainer
          show={showDeleteDialog}
          isCompact
          className="w-auto h-auto text-left px-8 py-10 mx-auto max-w-sm max-sm:px-8"
          dialogClassName="max-sm:max-w-sm"
        >
          <h2 className="font-bold text-xl self-start">Delete post ?</h2>
          <p className="text-gray mt-2 mb-4">
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from search results.{" "}
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Button variant="destructive" size="full">
              Delete
            </Button>
            <Button
              variant="outline"
              size="full"
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </PopUpContainer>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto ring-0 hover:bg-secondary hover:bg-opacity-20 p-1 outline-0 ease-in-out duration-200"
          >
            <HiOutlineDotsHorizontal className="cursor-pointer text-xl rounded-full text-gray hover:text-secondary ease-in-out duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-48 bg-black">
          {user && user.userName === tweet.user.userName ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-danger gap-2 items-center font-bold"
                onClick={() => setShowDeleteDialog(true)}
              >
                <FiTrash2 className="text-lg" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <></>
          )}
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TweetOptionsMenu;
