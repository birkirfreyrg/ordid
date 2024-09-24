import GameTable from "@/components/GameTable";

export default function Home() {
  return (
    // Wrapper
    <div className="flex flex-col h-screen">
      <h1 className="flex justify-center my-4 text-5xl ">ORÐIÐ</h1>
      <div className="flex mt-20 justify-center items-center">
        <GameTable />
      </div>
    </div>
  );
}
