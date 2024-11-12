interface WinScreenProps {
  word: string;
  isOpen: boolean;
  onReset: () => void;
  close: () => void;
}

export default function WinScreen({
  word,
  isOpen,
  onReset,
  close,
}: WinScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black p-8 rounded-lg shadow-lg animate-bounce-once text-center mb-72 w-2/6">
        <button onClick={close} className="fixed top-0 right-0 mr-4 mt-1">
          X
        </button>
        <h2 className="text-5xl font-bold mb-4 text-green-500">Woohoo!</h2>
        <p className="text-xl">Til hamingju snillingur!</p>
        <p className="mb-6">{word} var rétt orð!</p>
        <p className="mb-6"></p>
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
