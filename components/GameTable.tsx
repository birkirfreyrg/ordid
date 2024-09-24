"use client";

import { useState, useRef, useEffect } from "react";
import WinScreen from "./WinScreen";
import LooseScreen from "./LooseScreen";
import Keyboard from "./Keyboard";

export default function GameTable() {
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  // Initial state now tracks multiple rows
  const [rows, setRows] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [colors, setColors] = useState<string[][]>(
    Array(6).fill(Array(5).fill("transparent")) // Start with transparent colors
  );

  const [activeRow, setActiveRow] = useState<number>(0);
  const word = "starf";

  // Create refs for each input field with correct typing and initialization
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(rows.length)
      .fill(null)
      .map(() => Array(5).fill(null))
  );

  // Auto-focus on the first input of the active row when activeRow changes
  useEffect(() => {
    inputRefs.current[activeRow]?.[0]?.focus(); // Focus the first input of the new active row
  }, [activeRow]);

  // Function to check if the guessed word matches the correct word
  function checkWord() {
    const guessedWord = rows[activeRow].join("").toLowerCase(); // Join letters and convert to lowercase

    // Not able to guess if row is not filled
    if (guessedWord.length < 5) {
      return;
    }

    // Deep clone the colors array
    const newColors = colors.map((row) => [...row]);

    // Create a copy of the word array to track which letters have been "used up"
    const wordLetters = word.split(""); // ['x', 'x', 'x', 'x', 'x']

    // First pass: Mark correct letters (green) in the correct positions
    for (let i = 0; i < 5; i++) {
      if (guessedWord[i] === word[i]) {
        newColors[activeRow][i] = "green"; // Correct letter and position
        wordLetters[i] = ""; // Mark the letter as used
      }
    }

    // Second pass: Mark correct letters in wrong positions (yellow)
    for (let i = 0; i < 5; i++) {
      if (
        newColors[activeRow][i] !== "green" &&
        wordLetters.includes(guessedWord[i])
      ) {
        newColors[activeRow][i] = "goldenrod"; // Correct letter, wrong position
        // Remove the letter from wordLetters to avoid marking it again
        wordLetters[wordLetters.indexOf(guessedWord[i])] = "";
      } else if (newColors[activeRow][i] !== "green") {
        newColors[activeRow][i] = "gray"; // Incorrect letter
      }
    }

    setColors(newColors);

    if (guessedWord === word) {
      setHasWon(true); // Trigger the "You Win!" screen
      setActiveRow((prev) => prev + 1);
      return;
    }

    // Move to the next row after guessing
    if (activeRow < rows.length - 1) {
      setActiveRow((prev) => prev + 1);
    } else {
      setHasLost(true);
    }
  }

  const resetGame = () => {
    setRows([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setActiveRow(0);
    setColors(Array(6).fill(Array(5).fill("transparent")));
    setHasWon(false);
    setHasLost(false);
  };

  const borderStyle =
    "border-2 w-16 h-16 flex items-center justify-center text-5xl";

  // Handler to update the input value for each row and index
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    index: number
  ) => {
    if (e.target.value === " ") return;

    const newRows = [...rows];
    const value = e.target.value.toUpperCase();

    // Update the specific letter in the active row
    if (rowIndex === activeRow) {
      newRows[rowIndex][index] = value;
      setRows(newRows);

      // Move focus to the next input field in the current row
      if (value && index < rows[rowIndex].length - 1) {
        inputRefs.current[rowIndex]?.[index + 1]?.focus(); // Optional chaining to avoid null/undefined access
      }
    }
  };

  // Handler for keydown event (specifically checking for Enter and Backspace)
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    index: number
  ) => {
    if (e.key === "Enter" && rowIndex === activeRow) {
      // Check if all boxes in the active row are filled before submitting
      if (rows[activeRow].every((letter) => letter !== "")) {
        checkWord();
      }
    }

    // Handle Backspace: move to the previous box if necessary
    if (e.key === "Backspace" && rowIndex === activeRow) {
      const newRows = [...rows];

      // If the current box is empty, move focus to the previous input
      if (index > 0 && rows[rowIndex][index] === "") {
        inputRefs.current[rowIndex]?.[index - 1]?.focus();
        newRows[rowIndex][index - 1] = ""; // Clear the previous box
      } else {
        newRows[rowIndex][index] = ""; // Clear the current box
      }

      setRows(newRows);
    }
  };

  const handleOnScreenKeyPress = (key: string) => {
    const activeRowLetters = rows[activeRow];

    // Handle letter input
    if (key !== "Backspace" && key !== "Enter") {
      for (let i = 0; i < activeRowLetters.length; i++) {
        if (activeRowLetters[i] === "") {
          const newRows = [...rows];
          newRows[activeRow][i] = key;
          setRows(newRows);

          // Move focus to the next input box
          if (i < activeRowLetters.length - 1) {
            inputRefs.current[activeRow]?.[i + 1]?.focus();
          }
          break;
        }
      }
    }

    // Handle backspace logic
    if (key === "Backspace") {
      for (let i = activeRowLetters.length - 1; i >= 0; i--) {
        if (activeRowLetters[i] !== "") {
          const newRows = [...rows];
          newRows[activeRow][i] = ""; // Clear the current box
          setRows(newRows);
          inputRefs.current[activeRow]?.[i]?.focus(); // Move focus to the current box
          break;
        } else if (
          i > 0 &&
          activeRowLetters[i] === "" &&
          activeRowLetters[i - 1] !== ""
        ) {
          const newRows = [...rows];
          newRows[activeRow][i - 1] = ""; // Clear the previous box
          setRows(newRows);
          inputRefs.current[activeRow]?.[i - 1]?.focus(); // Move focus to the previous box
          break;
        }
      }
    }

    // Handle enter
    if (key === "Enter" && rows[activeRow].every((letter) => letter !== "")) {
      checkWord();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {rows.map((row, rowIndex) => (
        <div className="flex justify-center items-center gap-3" key={rowIndex}>
          {row.map((letter, index) => (
            <div
              className={borderStyle}
              key={index}
              style={{
                borderColor: "gray",
                backgroundColor:
                  rowIndex < activeRow
                    ? colors[rowIndex][index]
                    : "transparent", // Only apply color to previous rows
              }}
            >
              <input
                ref={(el) => {
                  // Ensure inputRefs.current[rowIndex] is initialized as an array
                  if (!inputRefs.current[rowIndex]) {
                    inputRefs.current[rowIndex] = [];
                  }
                  inputRefs.current[rowIndex][index] = el; // Store the reference in the correct position
                }}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e) => handleInputChange(e, rowIndex, index)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, index)}
                disabled={rowIndex !== activeRow} // Disable non-active rows
                className="text-center w-full h-full bg-transparent border-none focus:outline-none"
                autoFocus={rowIndex === 0 && index === 0} // Auto-focus the first input in the first row
              />
            </div>
          ))}
        </div>
      ))}

      <Keyboard onKeyPress={handleOnScreenKeyPress} />
      <WinScreen isOpen={hasWon} onReset={resetGame} />
      <LooseScreen isOpen={hasLost} onReset={resetGame} />
    </div>
  );
}
