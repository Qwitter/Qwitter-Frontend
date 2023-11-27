import { HeaderButton } from "@/models/PopUpModel";
import { PopUpContainer } from "../PopUpContainer/PopUpContainer";
import { Button } from "../ui/button";

type DiscardProfileChangesProps = {
  showDiscardChanges: boolean;
  setShowDiscardChanges: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
};

export const DiscardProfileChanges = ({
  showDiscardChanges,
  setShowDiscardChanges,
  handleClose,
}: DiscardProfileChangesProps) => {
  return (
    <PopUpContainer
      show={showDiscardChanges}
      headerButton={HeaderButton.none}
      className="p-8 h-[260px] sm:w-[320px] sm:h-[260px] justify-between"
      isCompact={true}
      dialogClassName="w-[320px] max-w-[80vw] h-[260px]"
    >
      <div>
        <h3 className="mb-2 leading-6 text-xl font-bold">Discard changes?</h3>
        <p className="text-[15px] leading-5 text-gray">
          This can’t be undone and you’ll lose your changes.{" "}
        </p>
      </div>
      <div className="w-full">
        <Button
          variant="destructive"
          onClick={handleClose}
          size="full"
          className="mb-3 h-[44px]"
        >
          Discard
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setShowDiscardChanges(false);
          }}
          size="full"
          className="h-[44px]"
        >
          Cancel
        </Button>
      </div>
    </PopUpContainer>
  );
};
