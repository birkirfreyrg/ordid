// components/CSVReader.tsx
"use client";

import React, { useEffect, useState } from "react";

const CSVReader: React.FC = () => {
  const [randomFiveLetterWord, setRandomFiveLetterWord] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch("/api/read-csv");
        const data = await response.json();
        if (response.ok) {
          setRandomFiveLetterWord(data.randomFiveLetterWord);
        } else {
          console.error("Error fetching CSV data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchCsvData();
  }, []);

  return <div></div>;
};

export default CSVReader;
