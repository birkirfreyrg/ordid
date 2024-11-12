"use client";

import { useState, useRef, useEffect } from "react";
import WinScreen from "./WinScreen";
import LooseScreen from "./LooseScreen";
import Keyboard from "./Keyboard";
import WordNotFound from "./WordNotFound";

export default function GameTable() {
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [wordsData, setWordsData] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);
  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
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
  const [word, setWord] = useState<string | null>(null); // Store the fetched word

  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(rows.length)
      .fill(null)
      .map(() => Array(5).fill(null))
  );

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch("/api/read");
        const data = await response.json();
        setWordsData(data.fiveLetterWords);
        const newWord =
          data.fiveLetterWords[
            Math.floor(Math.random() * data.fiveLetterWords.length)
          ].toLowerCase(); // Set the fetched word
        setWord(newWord); // Store the new word in state
        console.log(newWord);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };

    fetchWord(); // Always fetch a new word
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    inputRefs.current[activeRow]?.[0]?.focus(); // Focus the first input of the new active row
  }, [activeRow]);

  const close = () => {
    setHasWon(false);
  };

  // Function to check if the guessed word matches the correct word
  function checkWord() {
    if (!word) return; // If the word hasn't been fetched yet, exit early

    const guessedWord: string = rows[activeRow].join("").toLowerCase(); // Join letters and convert to lowercase
    console.log(wordsData);
    // Not able to guess if row is not filled
    if (guessedWord.length < 5) {
      return;
    }

    /* TODO Add this with a larger database 
    (not the actual database so people can guess actual words even if they are not in the database) */
    /*
    if (!wordsData.includes(guessedWord)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }
    */
    const newColors = colors.map((row) => [...row]);

    // Create a copy of the word array to track which letters have been "used up"
    const wordLetters = word.split(""); // Split the word into individual letters

    // First pass: Mark correct letters (green) in the correct positions
    for (let i = 0; i < 5; i++) {
      if (guessedWord[i] === word[i]) {
        greenLetters.push(word[i]);
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
        yellowLetters.push(guessedWord[i]);
        newColors[activeRow][i] = "goldenrod"; // Correct letter, wrong position
        wordLetters[wordLetters.indexOf(guessedWord[i])] = ""; // Mark the letter as used
      } else if (newColors[activeRow][i] !== "green") {
        grayLetters.push(guessedWord[i]);
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
    // Reset the game state
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
    setGreenLetters([]);
    setYellowLetters([]);
    setGrayLetters([]);
    setHasWon(false);
    setHasLost(false);

    // Fetch a new word for the new game and store it in state (no sessionStorage)
    const fetchWord = async () => {
      try {
        const response = await fetch("/api/read");
        const data = await response.json();
        const newWord =
          data.fiveLetterWords[
            Math.floor(Math.random() * data.fiveLetterWords.length)
          ].toLowerCase(); // Ensure you get a random word each time
        setWord(newWord); // Set the new word in state
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };

    // Call fetchWord to get a new random word
    fetchWord();
  };

  // Handler for the "New Word" button
  const handleNewWordClick = () => {
    resetGame(); // Reset the game and fetch a new word
  };

  const borderStyle =
    "border-2 w-16 h-16 flex items-center justify-center text-5xl";

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
        inputRefs.current[rowIndex]?.[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    index: number
  ) => {
    if (e.key === "Enter" && rowIndex === activeRow) {
      if (rows[activeRow].every((letter) => letter !== "")) {
        checkWord();
      }
    }

    if (e.key === "Backspace" && rowIndex === activeRow) {
      const newRows = [...rows];

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

    if (key !== "Backspace" && key !== "Enter") {
      for (let i = 0; i < activeRowLetters.length; i++) {
        if (activeRowLetters[i] === "") {
          const newRows = [...rows];
          newRows[activeRow][i] = key;
          setRows(newRows);

          if (i < activeRowLetters.length - 1) {
            inputRefs.current[activeRow]?.[i + 1]?.focus();
          }
          break;
        }
      }
    }

    if (key === "Backspace") {
      for (let i = activeRowLetters.length - 1; i >= 0; i--) {
        if (activeRowLetters[i] !== "") {
          const newRows = [...rows];
          newRows[activeRow][i] = "";
          setRows(newRows);
          inputRefs.current[activeRow]?.[i]?.focus();
          break;
        } else if (
          i > 0 &&
          activeRowLetters[i] === "" &&
          activeRowLetters[i - 1] !== ""
        ) {
          const newRows = [...rows];
          newRows[activeRow][i - 1] = "";
          setRows(newRows);
          inputRefs.current[activeRow]?.[i - 1]?.focus();
          break;
        }
      }
    }

    if (key === "Enter" && rows[activeRow].every((letter) => letter !== "")) {
      checkWord();
    }
  };

  if (!word) {
    return <p>Loading...</p>; // Show a loading state until the word is fetched
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {rows.map((row, rowIndex) => (
          <div className="flex gap-3" key={rowIndex}>
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
                    if (!inputRefs.current[rowIndex]) {
                      inputRefs.current[rowIndex] = [];
                    }
                    inputRefs.current[rowIndex][index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e) => handleInputChange(e, rowIndex, index)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, index)}
                  disabled={rowIndex !== activeRow}
                  className="text-center w-full h-full bg-transparent border-none focus:outline-none"
                  autoFocus={rowIndex === 0 && index === 0}
                />
              </div>
            ))}
          </div>
        ))}

        <Keyboard
          onKeyPress={handleOnScreenKeyPress}
          greenLetters={greenLetters}
          yellowLetters={yellowLetters}
          grayLetters={grayLetters}
        />

        <WinScreen isOpen={hasWon} onReset={resetGame} close={close} />
        <LooseScreen isOpen={hasLost} onReset={resetGame} word={word} />
        {/* TODO Word not in database error with a larger database */}
        {/*
        <WordNotFound
          notAWord={showError}
          guessedWord={rows[activeRow].join("")}
        />
        */}
      </div>
      <div className="absolute top-0 left-0 m-4">
        <button
          onClick={handleNewWordClick}
          className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
        >
          Nýtt orð
        </button>
      </div>
    </>
  );
}
