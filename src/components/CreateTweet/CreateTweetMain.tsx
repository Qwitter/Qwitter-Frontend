import { Textarea } from "./textarea";
import TweetImagesViewer from "../TweetImagesViewer/TweetImagesViewer";
import CreateTweetFooter from "./CreateTweetFooter";
import { CreateTweetMainProp, Mention } from "./types/CreateTweetProps";
import CreateTweetPopUp from "./CreateTweetPopUp";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
export default function CreateTweetMain({
  selectedImages,
  setSelectedImages,
  handleSubmit,
  setFiles,
  tweet,
  files,
  mode,
  setTweet,
  handleRemoveFile,
  form,
}: CreateTweetMainProp) {
  const [mentionsAndTags, SetMentionsAndTags] = useState<Mention[]>([]);
  const [popup, setPopup] = useState({
    visible: false,
    content: "",
    index: 0,
    position: { top: 0, left: 0 },
  });
  const { user } = useContext(UserContext);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length > 700) return;
    setTweet(inputText);
    form.setValue("Text", inputText);
    form.trigger("Text");
  };

  const handleUserClick = (username: string) => {
    // Find the mention in the current text and replace it with the selected username

    const mention = mentionsAndTags[popup.index];
    const startPosition = mention.position;
    const updatedText =
      tweet.slice(0, startPosition) +
      " " +
      username +
      tweet.slice(startPosition + mention.length);
    setTweet(updatedText.trimStart());

    // Close the popup
    setTimeout(() => {
      setPopup({
        visible: false,
        content: "",
        index: 0,
        position: { top: 0, left: 0 },
      });
    }, 50);
  };

  return (
    <div className="flex flex-row items-start h-full w-full ">
      <div className="mr-1 mt-3 min-w-fit">
        <Avatar className="w-10 h-10 rounded-full border-[#ffffee62] border-[1px] border-solid block">
          <AvatarImage
            src={`${user?.profileImageUrl}`}
            alt="profilePic"
            className="rounded-full w-10 h-10"
          />
          <AvatarFallback>{user?.userName.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[90%] relative">
        <div className=" overflow-y-auto max-h-[480px] relative">
          <Textarea
            {...form.register("Text", {
              required: "Enter a tweet",
              onChange: (e) => handleInputChange(e),
            })}
            SetMentionsAndTags={SetMentionsAndTags}
            popup={popup}
            setPopup={setPopup}
            mode={mode}
            mentionsAndTags={mentionsAndTags}
            placeholder="What is happing?!"
            text={tweet}
            className="bg-transparent  placeholder:text-gray  focus:ring-transparent focus:border-none focus:outline-none resize-none border-none"
            data-testid="tweetInput"
          />

          <TweetImagesViewer
            screen="tweet"
            images={selectedImages}
            mode="edit"
            removeAttachment={handleRemoveFile}
          />
        </div>
        {popup.visible && (
          <CreateTweetPopUp
            popUp={popup}
            closePopup={() =>
              setPopup({
                visible: false,
                content: "",
                index: 0,
                position: { top: 0, left: 0 },
              })
            }
            handleUserClick={handleUserClick}
          />
        )}

        {mode == "home" && (
          <CreateTweetFooter
            mode={mode}
            files={files!}
            setFiles={setFiles!}
            isValid={form.formState.isValid}
            text={tweet}
            handleSubmit={handleSubmit!}
            selectedImages={selectedImages!}
            setSelectedImages={setSelectedImages!}
          />
        )}
      </div>
    </div>
  );
}
