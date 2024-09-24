import GameTable from "@/components/GameTable";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="flex justify-center my-4 text-5xl font-serif ">ORÐIÐ</h1>
      <div className="flex w-full h-full justify-center items-center">
        <GameTable />
      </div>
    </div>
  );
}
