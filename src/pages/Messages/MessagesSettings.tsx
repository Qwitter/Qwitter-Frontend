import { OptionsHeader } from "@/components";
import { useState } from "react";
import { AllowMessagesOptions } from "@/constants";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

export function MessagesSettings() {
    const [optionValue, setOptionValue] = useState('Everyone');
    return (
        <div className=" w-full h-full border-r border-primary border-opacity-30 mb-20">
            <OptionsHeader header='Direct Messages' />
            <div className="px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-primary text-[15px] font-semibold"> Allow message requests from:</span>
                    <span className="text-gray text-[13px]"> People you follow will always be able to message you</span>
                </div>
                <RadioGroup defaultValue="option-one"
                    value={optionValue}
                    onValueChange={setOptionValue}
                >
                    <ul className="mt-2">
                        {AllowMessagesOptions.map((option, index) => (
                            <li key={index} id={option} className="w-full flex flex-row items-center justify-between py-1 cursor-pointer" onClick={() => setOptionValue(option)}>
                                <label>{option}</label>
                                <RadioGroupItem className="w-5 h-5 border-gray border text-secondary" value={option} />
                            </li>
                        ))}
                    </ul>
                </RadioGroup>
            </div>
        </div>
    );
}
