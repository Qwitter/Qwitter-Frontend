import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { Button } from "../ui/button";

export const SignUpProfile = () => {
  return (
    <PopUpContainer show={true} showLogo={true} className="justify-between">
      <div className="w-full flex flex-col justify-start items-start">
        <div className="my-5">
          <h2 className="text-3xl font-bold">Pick a profile picture</h2>
          <h5 className="text-gray text-[15px] mt-2">
            Have a favorite selfie? Upload it now.
          </h5>
        </div>
        <div className="w-full h-[320px] flex justify-center items-center">
          picker here
        </div>
      </div>
      <Button variant="outline" size="full" className="h-[50px] font-bold my-1">
        Skip for now
      </Button>
    </PopUpContainer>
  );
};
