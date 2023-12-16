import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { Button } from "../ui/button";
import { WarningPopUpProp } from "./WarningPopUpProp";

export function WarningPopUp({
  UserAction,
  username,
  desc,
  ButtonFunc,
  ButtonVariant,
  PopUpshow,
  headerFunction,
}: WarningPopUpProp) {
  return (
    <>
      <PopUpContainer
        className="flex flex-col justify-center h-[325px] w-[325px]"
        show={PopUpshow}
        headerFunction={headerFunction}
      >
        <div className=" w-[250px]">
          <h1 className="mt-4 font-bold text-xl">
            {UserAction} @{username}
          </h1>
          <div className="mt-2 text-[#505457]">{desc}</div>
          <Button
            variant={ButtonVariant}
            onClick={ButtonFunc}
            className="mt-4 w-full h-[45px] font-bold"
            data-testid="Unfollow"
          >
            <span
              className={
                ButtonVariant == "destructive" ? "text-white" : "text-black"
              }
            >
              {UserAction}
            </span>
          </Button>
          <Button
            variant={"outline"}
            onClick={(event) => {
              event.stopPropagation();
              headerFunction();
            }}
            className="mt-4 w-full h-[45px] font-bold"
          >
            <span className="text-white">cancel</span>
          </Button>
        </div>
      </PopUpContainer>
    </>
  );
}
