import GameTable from "@/components/GameTable";

export default function Home() {
  return (
    // Wrapper
    <div className="flex flex-col">
      <h1 className="flex justify-center w-full my-2 text-5xl ">ORÐIÐ</h1>
      <div className="flex flex-col gap-4">
        <GameTable />
      </div>
    </div>
  );
}
