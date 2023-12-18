import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { HighlightWithinTextarea } from "react-highlight-within-textarea"
import getCaretCoordinates from 'textarea-caret';
import { Mention } from "./types/CreateTweetProps";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
  text: string;
  mode: "popUp" | "home"|"Message"|"reply",
  SetMentionsAndTags: React.Dispatch<React.SetStateAction<Mention[]>>;
  mentionsAndTags: Mention[];
  highlightClassName?:string;
  setPopup: React.Dispatch<React.SetStateAction<{
    visible: boolean;
    content: string;
    index: number;
    position: {
      top: number;
      left: number;
    };
  }>>;
  popup: {
    visible: boolean;
    content: string;
    index: number;
    position: {
      top: number;
      left: number;
    };
  };
}

const Textarea: React.FC<TextareaProps> = ({ highlightClassName,text, className, popup,setPopup, mentionsAndTags, SetMentionsAndTags, mode, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mentionOpenedPopup, setMentionOpenedPopup] = useState(false);
  useEffect(() => {
    auto_height()
    updateMention()
    checkMention()
    
  }, [text])
  useEffect(() => {
    checkMention()

  }, [mentionsAndTags])

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

  function auto_height() {
    textAreaRef.current!.style.height = '1px';
    textAreaRef.current!.style.height = `${textAreaRef.current!.scrollHeight}px`;
    containerRef.current!.style.height = '1px';

    containerRef.current!.style.height=`${textAreaRef.current!.scrollHeight}px`;
  }



  function getSubstringLimited(inputString: string, startPosition: number): string {
    const spaceIndex = inputString.indexOf(' ', startPosition);
    const enterIndex = inputString.indexOf('\n', startPosition);

    const nextSpace = spaceIndex !== -1 ? spaceIndex : Infinity;
    const nextEnter = enterIndex !== -1 ? enterIndex : Infinity;
    const endPosition = Math.min(nextSpace, nextEnter, startPosition + 20)
    const result = inputString.substring(text[0] == '@' || text[0] == '#' ? startPosition - 1 : startPosition, endPosition + 1);
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
    mentionsAndTags.forEach((mention, index) => {
      if (
        cursorPosition > mention.position + 1 &&
        cursorPosition <= mention.position + mention.length
      ) {
        if (popup.index !== index)
          closePopUp()
        else
          showPopup(mention, true, index)
        if (!mentionOpenedPopup)
          showPopup(mention, false, index)
        foundMentionInRange = true;
      }
    });

    if (!foundMentionInRange && mentionOpenedPopup)
      closePopUp()

  }
  function showPopup(mention: { position: number; mention: string; }, updateFlag: boolean, index: number) {
    // Cursor is within the mention range, show the popup
    const cursor = getCaretCoordinates(textAreaRef.current!, textAreaRef.current!.selectionEnd);
    const numOfScreen =Math.floor(containerRef.current!.scrollHeight/480);
    const popupTop = cursor.top+30-numOfScreen*textAreaRef.current!.scrollHeight;
    const mentionContent = getSubstringLimited(text, mention.position + 1)
    const popupLeft = cursor.left - 8 * mentionContent.length;
    
    setPopup({
      visible: true,
      content: mentionContent.trim(),
      index: index,
      position: { top:Math.max(40,(updateFlag ? popup.position.top : popupTop ^ 0)), left: updateFlag ? popup.position.left : popupLeft ^ 0 },
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

  return (
    <>
      <div className={`relative w-full ${mode == "popUp" ? 'min-h-[80px]' : ''} `}>
        <textarea
          className={cn(
            "flex absolute text-[20px] w-full  top-0 left-0 caret-white text-[#ffffff00] leading-[30px] h-full z-[10]  min-w-[95%] rounded-md border border-input bg-background p-3 ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 scroll-m-0 scroll-p-0 no-scrollbar",
            className
          )}
          value={text}
          ref={textAreaRef}
          onClick={checkMention}
          onScroll={handleScroll}
          onKeyDown={()=>{checkMention}}
          {...props}

        />
        <div
          className={cn("static z-0 w-full leading-[22px] p-3  break-words text-[20px] no-scrollbar overflow-y-auto",highlightClassName)} ref={containerRef}  >
          {<HighlightWithinTextarea textDirectionality="LTR" value={text} {...{ highlight: (mode=="Message") ? [{ highlight: /(^|\s)((@[\w]{1,20}|#[\w]+))/g, className: "text-secondary bg-transparent" }] : [{ highlight: [280, text.length], className: "bg-red-600 text-primary" }, { highlight: /(^|\s)((@[\w]{1,20}|#[\w]+))/g, className: "text-secondary bg-transparent" }] }} readOnly placeholder="" />
          }
        </div>
      </div>
    </>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
