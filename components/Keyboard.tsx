import Backspace from "./Backspace";
import EnterIcon from "./EnterIcon";

type OnScreenKeyboardProps = {
  onKeyPress: (key: string) => void;
};

const Keyboard = ({ onKeyPress }: OnScreenKeyboardProps) => {
  const keys = [
    ["A", "Á", "B", "D", "E", "É", "F", "G", "H", "I", "Backspace"],
    ["Í", "J", "K", "L", "M", "N", "O", "Ó", "P", "R", "S"],
    ["T", "U", "Ú", "V", "X", "Y", "Ý", "Þ", "Æ", "Ð", "Ö"],
  ];

  return (
    <div className="flex flex-col gap-2 mt-12">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between gap-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`bg-gray-500 hover:bg-gray-400 w-12 h-12 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded  ${
                key === "Backspace" ? "px-3" : ""
              } ${key === "Enter" ? "px-3" : ""}`}
            >
              {key === "Backspace" ? <Backspace /> : key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onKeyPress("Enter")}
          className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-500 rounded"
        >
          GISKA
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
