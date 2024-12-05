import NavBar from "./components/navbar";

export default function Home() {
  return (
    <>   
      <div style={{ position: "relative" }}>
        <NavBar />
      </div>
      <div className="h-screen bg-home-bg">
        <div className="h-full flex flex-col items-center justify-center text-7xl text-white text-center font-semibold">
          <div>
            Capture Your <span style={{ color: "yellow" }}>Memories</span>
          </div>
          <div>
            with Adventures
          </div>
          
        </div>
      </div>
    </>
  );
}
