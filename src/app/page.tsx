import AboutComponent from "./components/about_component";
import Button from "./components/button";
import Heading from "./components/heading";
import NavBar from "./components/navbar";

export default function Home() {
  const imageUrls = [
    "./uploads/up_1000.jpg", // Add more image URLs as needed
    "./uploads/up_1001.jpg",
    "./uploads/up_1002.jpg",
  ];

  const paragraphTexts = [
    "We are a team of passionate individuals committed to delivering excellence. Our mission is to create innovative solutions and provide outstanding service to our clients. Join us in our journey!",
    "Our expertise spans across various industries, and we pride ourselves on our adaptability. We work closely with clients to ensure their needs are met with precision and care.",
    "Innovation and creativity are at the core of what we do. Our team constantly pushes the boundaries to deliver unique and impactful solutions for every project we undertake.",
  ];

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
          <Button text="Call Now" color="green" className="mt-10 px-10 py-2 text-white text-2xl" />
        </div>
      </div>

      {/* Who are we Section */}
      <div className="bg-white h-screen mt-72 pl-36 pr-36 mb-72">
        <Heading text="Who are we?" color="text-gray-600" />

        <div className="m-28"></div>

        {/* Map through the arrays and pass data to AboutComponent */}
        {imageUrls.map((imageUrl, index) => (
          <AboutComponent
            key={index}
            imageUrl={imageUrl}
            paragraphText={paragraphTexts[index]}
            image_side={index % 2 === 0 ? "left" : "right"} // Odd index: left, Even index: right
          />
        ))}
      </div>
    </>
  );
}

