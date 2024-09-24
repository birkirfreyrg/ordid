// app/api/read-csv/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  const csvFilePath = path.join(process.cwd(), 'data', 'BIN_ordalisti.csv');

  // Read the CSV file
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');

  // Parse the CSV file
  let fiveLetterWords: string[] = [];

  Papa.parse(fileContent, {
    complete: (result) => {
      const data = result.data as string[][];

      // Extract words from the first column only
      const firstColumnWords = data.map(row => row[0]);

      // Filter for 5-letter words in the first column
      fiveLetterWords = firstColumnWords.filter(word => word && word.length === 5);
    },
    header: false,
  });

  if (fiveLetterWords.length > 0) {
    // Select a random 5-letter word from the first column
    const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
    const randomFiveLetterWord = fiveLetterWords[randomIndex];
    return NextResponse.json({ randomFiveLetterWord });
  } else {
    return NextResponse.json({ error: 'No 5-letter words found in the first column' }, { status: 400 });
  }
}
