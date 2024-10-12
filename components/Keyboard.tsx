import Backspace from "./Backspace";

type OnScreenKeyboardProps = {
  onKeyPress: (key: string) => void;
  greenLetters: string[];
  yellowLetters: string[];
  grayLetters: string[];
};

const Keyboard = ({
  onKeyPress,
  greenLetters,
  yellowLetters,
  grayLetters,
}: OnScreenKeyboardProps) => {
  const keys = [
    ["A", "Á", "B", "D", "E", "É", "F", "G", "H", "I", "Backspace"],
    ["Í", "J", "K", "L", "M", "N", "O", "Ó", "P", "R", "S"],
    ["T", "U", "Ú", "V", "X", "Y", "Ý", "Þ", "Æ", "Ð", "Ö"],
  ];

  const greenButton =
    "bg-green-600 hover:bg-green-400 border-green-700 hover:border-green-500";
  const grayButton =
    "bg-gray-500 hover:bg-gray-400 border-gray-700 hover:border-gray-500";
  const yellowButton =
    "bg-yellow-500 hover:bg-yellow-400 border-yellow-600 hover:border-yellow-500";
  const darkGrayButton = "bg-gray-700 border-gray-800";

  return (
    <div className="flex flex-col bottom-0 gap-2 my-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between gap-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`  w-12 h-12 ${
                greenLetters.includes(key.toLowerCase())
                  ? greenButton
                  : grayButton
              } ${
                yellowLetters.includes(key.toLowerCase()) &&
                !greenLetters.includes(key.toLowerCase())
                  ? yellowButton
                  : grayButton
              } ${
                grayLetters.includes(key.toLowerCase()) &&
                !greenLetters.includes(key.toLowerCase()) &&
                !yellowButton.includes(key.toLowerCase())
                  ? darkGrayButton
                  : grayButton
              } text-white font-bold py-2 px-4 border-b-4 rounded  ${
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
      {"Gray Letters eru: " + grayLetters}
    </div>
  );
};

export default Keyboard;
