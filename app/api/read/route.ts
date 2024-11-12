import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Define the path to your text file
    const filePath = path.join(process.cwd(), 'data', 'icelandic_five_letter_words.txt');

    // Read and process the file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fiveLetterWords = fileContent.split(';').map(word => word.trim()).filter(word => word.length === 5).sort();
    

    return NextResponse.json({ fiveLetterWords });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Failed to read the file" }, { status: 500 });
  }
}
