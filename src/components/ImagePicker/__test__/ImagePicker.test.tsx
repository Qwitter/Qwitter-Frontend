import { fireEvent, render} from "@testing-library/react";
import { ImagePicker } from "../ImagePicker";

test("Image Picker Test", () => {
const testOnChange = jest.fn();
const testSetImagePath = jest.fn();

  const { container } = render(
    <ImagePicker
      name="photo"
      setImagePath={testSetImagePath}
      image="testPath"
      optionalOnChange={testOnChange}

      isRemovable
    />
  );

  // get tags
  const imageInput = container.querySelector("input");
  const imageTag = container.querySelector("img");
  const icons = container.querySelectorAll("svg");

  // check default image path
    expect(imageTag?.getAttribute("src")).toBe("testPath");

    // check camera and X
    expect(icons.length).toBe(2);

    // create a file to be uploaded
      const file = new File(["file content"], "file.png", {
        type: "image/png",
      });

    fireEvent.change(imageInput!, { target: { files: [file] } });
    expect(testOnChange).toHaveBeenCalled();
    expect(testSetImagePath).toHaveBeenCalled();
});
