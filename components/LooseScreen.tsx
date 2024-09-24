interface LooseScreenProps {
  isOpen: boolean;
  onReset: () => void;
  word: string;
}

export default function LooseScreen({
  isOpen,
  word,
  onReset,
}: LooseScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black p-8 rounded-lg shadow-lg animate-bounce-once text-center mb-72 w-2/6">
        <h2 className="text-5xl font-bold mb-4 text-red-500">Úpsí!</h2>
        <p className="text-xl">Því miður!</p>
        <p className="mb-6">Þú giskaðir ekki á rétt orð!</p>
        <p className="mb-6">Rétta orðið var {word}</p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full text-lg font-semibold"
          onClick={onReset}
        >
          Spila aftur
        </button>
      </div>
    </div>
  );
}
