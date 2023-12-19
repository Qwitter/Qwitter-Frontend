import { OptionsHeader } from "@/components";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MessagesContext } from "@/contexts/MessagesContextProvider";
import { cn } from "@/lib";
import { ConversationLeavePopUp } from "../MessagesPopup/ConversationLeavePopUp";
import { Spinner } from "@/components/Spinner";
import { UsersListItem } from "@/components/UsersListItem/UsersListItem";
import { ConversationBlockUserPopup } from "../MessagesPopup/ConversationBlockUserPopup";
import ImageGrid from "../ImageGrid";

export function MessagesConversationInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useParams();
  const { currentConversation } = useContext(MessagesContext);
  const [show, setShow] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const handleBlock = () => {
    console.log(currentConversation);
    setShowBlock(true);
  };
  if (!currentConversation) {
    <div className="w-full h-[300px] p-8">
      <Spinner />
    </div>;
  } else
    return (
      <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
        <OptionsHeader
          header={
            !currentConversation.isGroup ? "Conversation info" : "Group info"
          }
        />
        {currentConversation.isGroup && (
          <>
            <div className="px-4 py-3 flex flex-row items-center">
              {!currentConversation.photo ? <ImageGrid
                className="w-12 h-10  rounded-full mr-2 min-w-[40px] max-lg:w-10 "
                images={currentConversation.users.map(conversation => conversation.profileImageUrl || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg")} /> :
                <Avatar className="mr-4 min-w-max ">
                  <AvatarImage className="w-10 h-10 rounded-full border-[#ffffee] border-[1px] border-solid" src={currentConversation.photo} />
                </Avatar>}
              <div className="flex flex-row justify-between w-full">
                <span className="text-primary text-[15px] font-bold">
                  {currentConversation?.fullName}
                </span>
                <Link
                  className="text-secondary text-[15px] hover:underline"
                  to={`/messages/${currentConversation?.id}/group-info`}
                  state={{ previousLocation: location }}
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="px-4 py-3 w-full border-t border-primary border-opacity-30">
              <h2 className="text-primary text-xl font-bold text-start ">
                People
              </h2>
            </div>
          </>
        )}
        <div className="max-h-[40vh] overflow-y-auto">
          {currentConversation.users.map((user, index) => (
            <UsersListItem
              isFollowing={user.isFollowed!}
              verified={user.isVerified! || false}
              key={index}
              username={user.userName}
              profileImageUrl={user.profileImageUrl || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
              name={user.name}
              description=""
              listType={
                currentConversation.blocked ? "BlockList" : "FollowList"
              }
              showDesc={false}
            />
          ))}
        </div>
        <div
          className={cn(
            "block text-center cursor-pointer transition-all text-secondary hover:bg-[#031019] p-4 pb-5  border-primary border-opacity-30",
            !currentConversation.isGroup ? "border-t" : "border-b"
          )}
          onClick={
            !currentConversation.isGroup
              ? handleBlock
              : () => {
                navigate("/Messages/" + currentConversation.id + "/add", {
                  state: { previousLocation: location },
                });
              }
          }
        >
          {!currentConversation.isGroup
            ? `Block @${currentConversation.users[0].userName}`
            : "Add People"}
        </div>
        <div
          className="block text-center cursor-pointer transition-all text-danger  hover:bg-danger hover:bg-opacity-10 p-4"
          onClick={() => {
            setShow(true);
          }}
        >
          Leave Conversation
        </div>
        <ConversationLeavePopUp
          show={show}
          setShow={setShow}
          conversationToDelete={conversationId}
        />
        <ConversationBlockUserPopup
          show={showBlock}
          setShow={setShowBlock}
          userName={currentConversation.users[0].userName}
        />
      </div>
    );
}
