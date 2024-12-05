import Button from "./components/button";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <>   
      <div style={{ position: "relative" }}>
        <NavBar />
      </div>

      {/* Hero Section */}
      <div className="h-screen bg-home-bg">
        <div className="h-full flex flex-col items-center justify-center text-7xl text-white text-center font-semibold">
          <div>
            Capture Your <span style={{ color: "yellow" }}>Memories</span>
          </div>
          <div>
            with Adventures
          </div>
          <Button text="Call Now" color="green" className="mt-10 px-10 py-5 text-white text-2xl"/>
        </div>
      </div>

      {/* Who are we Section */}
      <div className="bg-white h-screen mt-72">
        hi
      </div>
    </>
  );
}
