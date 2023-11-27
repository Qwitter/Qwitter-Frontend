import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { HighlightWithinTextarea } from "react-highlight-within-textarea"
import getCaretCoordinates from 'textarea-caret';
import CreateTweetPopUp from '../CreateTweet/CreateTweetPopUp'
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  mode:"popUp"|"home"
}

interface Mention {
  position: number;
  length: number;
  mention: string;
}

const Textarea: React.FC<TextareaProps> = ({ text, setText, className, mode,maxRows = 19, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mentionsAndTags, SetMentionsAndTags] = useState<Mention[]>([])
  const [mentionOpenedPopup, setMentionOpenedPopup] = useState(false);
  const [popup, setPopup] = useState({
    visible: false,
    content: '',
    index: 0,
    position: { top: 0, left: 0 },
  });
  useEffect(()=>{
    updateMention()
    checkMention()
  },[text])
  useEffect(()=>{
    checkMention()

  },[mentionsAndTags])

  const updateMention = () => {
    const mentionRegex = /(^|\s)((@[\w]{1,20}|#[\w]+))/g;
    
    const matchMention = [...text.matchAll(mentionRegex)]
    const mentionsTemp: Mention[] = []
    if (text.length > 280 || matchMention.length === 0) return;
    matchMention.forEach((match) => {
      const index = match.index!;
      mentionsTemp.push({ position: index, length: match[0].length, mention: match[0] })
      SetMentionsAndTags(mentionsTemp);
    });


  }

 

  const calculateRows = () => {
    const rowsFromNewlines = text.split('\n').length; // Count the number of newline characters

    const rows = text.length == 0 ? 0 : Math.floor((text.length * 10) / (textAreaRef.current?textAreaRef.current.offsetWidth - 24:1000));
    return Math.max(Math.min(rows + rowsFromNewlines, maxRows), 4);
  };

  function getSubstringLimited(inputString: string, startPosition: number): string {
    const spaceIndex = inputString.indexOf(' ', startPosition);
    const enterIndex = inputString.indexOf('\n', startPosition);

    const nextSpace = spaceIndex !== -1 ? spaceIndex : Infinity;
    const nextEnter = enterIndex !== -1 ? enterIndex : Infinity;
    const endPosition = Math.min(nextSpace, nextEnter, startPosition + 20)
    const result = inputString.substring(text[0]=='@'||text[0]=='#'?startPosition-1:startPosition, endPosition + 1);
    return result;
  }


  const handleScroll = () => {

    const scrollValue = textAreaRef.current?.scrollTop;
    containerRef!.current!.scrollTop = scrollValue!;
  };
  function checkMention() {
    const cursorPosition = textAreaRef.current!.selectionStart;

    let foundMentionInRange = false;
    // Iterate through mentions
    mentionsAndTags.forEach((mention,index) => {
      if (
        cursorPosition > mention.position + 1 &&
        cursorPosition <= mention.position + mention.length 
      ) {
        if (popup.index !== index)
          closePopUp()
        else
          showPopup(mention, true,index)
        if (!mentionOpenedPopup)
          showPopup(mention, false,index)
        foundMentionInRange = true;
      }
    });

    if (!foundMentionInRange && mentionOpenedPopup)
      closePopUp()

  }
  function showPopup(mention: { position: number;mention:string; }, updateFlag: boolean,index:number) {
    // Cursor is within the mention range, show the popup
    const cursor = getCaretCoordinates(textAreaRef.current!, textAreaRef.current!.selectionEnd);
    const popupTop = cursor.top + 30;
    const mentionContent = getSubstringLimited(text, mention.position + 1)
    const popupLeft = cursor.left - 8 * mentionContent.length;
    setPopup({
      visible: true,
      content: mentionContent.trim(),
      index: index,
      position: { top: updateFlag ? popup.position.top : popupTop ^ 0, left: updateFlag ? popup.position.left : popupLeft ^ 0 },
    });
    setMentionOpenedPopup(true);
  }
  function closePopUp() {
    setPopup({
      visible: false,
      content: '',
      index: -1,
      position: { top: 0, left: 0 },
    });
    setMentionOpenedPopup(false);
  }
  const handleUserClick = (username: string) => {
    // Find the mention in the current text and replace it with the selected username

      const mention = mentionsAndTags[popup.index]
      const startPosition = mention.position;
      const updatedText = text.slice(0, startPosition) +" "+username+ text.slice(startPosition + mention.length);
      setText(updatedText.trimStart());
  
    // Close the popup
    setTimeout(() => {
      closePopUp();
    }, 10);
  };
  return (
<>
    <div className={`relative w-full ${mode=="popUp"?'min-h-[80px]':''} `}>
      <textarea
        className={cn(
          "flex absolute text-[20px] w-full overflow-y-auto  top-0 left-0 caret-white text-[#ffffff00] leading-[22px] h-full z-[10] min-h-[80px] min-w-[95%] rounded-md border border-input bg-background p-3 ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 scroll-m-0 scroll-p-0 no-scrollbar",
          className
        )}
        value={text}
        ref={textAreaRef}
        rows={calculateRows()}
        onClick={checkMention}
        onScroll={handleScroll}
        onKeyDown={checkMention}
        {...props}

      />
      <div
        className="static z-0 w-full leading-[22px] p-3  break-words text-[20px] no-scrollbar overflow-y-auto" ref={containerRef}  >
        {<HighlightWithinTextarea textDirectionality="LTR" value={text} highlight={[{ highlight: [279, text.length], className: "bg-red-600 text-primary" }, { highlight: /(^|\s)((@[\w]{1,20}|#[\w]+))/g, className: "text-secondary bg-transparent" }]} readOnly placeholder="" />
        }

      </div>

    


    </div>{popup.visible&&
      <CreateTweetPopUp popUp={popup} closePopup={closePopUp} handleUserClick={handleUserClick} />
    }
      </>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
