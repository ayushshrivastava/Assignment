import RightArrow from "../icons/Arrow";
import Brain from "../icons/Brain";
import Timer from "../icons/Timer";
import Button from "./Button";
import { useRef } from "react";

export default function QuizeCard({ timer ,question, options, clickHandler, handleOptionClick, typeQuestion }) {
    const userInputsRef = useRef(null);

    return (
        <div className="w-full p-2 md:p-4 border-3 border-gray-300 shadow-2xl rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xl font-bold text-white">
                    <Brain width={32} height={32} />
                    Quize
                </div>
                <div className="flex gap-2 items-center text-md font-bold text-white">
                    <Timer width={24} height={24} />
                    {timer}
                </div>
            </div>

            <div className="mt-10">
                <div>
                    <h1 className="text-2xl font-semibold font-mono text-white">{question}</h1>
                </div>

                {typeQuestion === "multiple-choice" ? (
                    <div className="mt-4">
                        {options.map((option, index) => (
                            <div
                                className="flex border-2 mt-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-400
                                 font-mono font-semibold text-md text-white bg-black"
                                key={index}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <input
                            type="text"
                                className="flex text-white bg-black border md:px-4 pl-0.5 mt-2 py-2 rounded-lg font-mono font-light text-md hover:bg-black autofill:bg-black autofill:text-white"
                            ref={userInputsRef}
                        />
                        <Button
                            title={"Submit"}
                            color={"purple"}
                            clickHandler={() => {
                                if (userInputsRef.current && userInputsRef.current.value.trim() !== "") {
                                    handleOptionClick(userInputsRef.current.value);
                                    userInputsRef.current.value = "";
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
