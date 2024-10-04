interface WordNotFoundProps {
  notAWord: boolean;
  guessedWord: string;
}

export default function WordNotFound({
  notAWord,
  guessedWord,
}: WordNotFoundProps) {
  if (!notAWord) return null;

  return (
    <div className="fixed top-1/4 text-lg bg-black p-3 bg-opacity-90 flex items-center justify-center rounded-md animate-bounce-once">
      <p className="">{guessedWord} er ekki í gagnagrunninum okkar</p>
    </div>
  );
}
