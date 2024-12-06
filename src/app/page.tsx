import AboutComponent from "./components/about_component";
import Button from "./components/button";
import Description from "./components/description";
import Destination from "./components/destination"; // Import Destination Component
import Heading from "./components/heading";
import NavBar from "./components/navbar";
import SubHeading from "./components/sub_heading";

export default function Home() {
  const imageUrls = [
    "./uploads/up_1000.jpg",
    "./uploads/up_1001.jpg",
    "./uploads/up_1002.jpg",
    "./uploads/up_1003.jpg",
    "./uploads/up_1004.jpg",
    "./uploads/up_1005.jpg",
    "./uploads/up_1006.jpg",
    "./uploads/up_1007.jpg",
  ];

  const paragraphTexts = [
    "We are a team of passionate individuals committed to delivering excellence. Our mission is to create innovative solutions and provide outstanding service to our clients. Join us in our journey!",
    "Our expertise spans across various industries, and we pride ourselves on our adaptability. We work closely with clients to ensure their needs are met with precision and care.",
    "Innovation and creativity are at the core of what we do. Our team constantly pushes the boundaries to deliver unique and impactful solutions for every project we undertake.",
  ];

  const destinations = [
    { imageUrl: "./uploads/up_1001.jpg", name: "Sunny Beach" },
    { imageUrl: "./uploads/up_1002.jpg", name: "Mountain View" },
    { imageUrl: "./uploads/up_1003.jpg", name: "Tropical Paradise" },
    { imageUrl: "./uploads/up_1004.jpg", name: "Desert Dunes" },
    { imageUrl: "./uploads/up_1005.jpg", name: "City Skyline" },
    { imageUrl: "./uploads/up_1006.jpg", name: "River Adventure" },
    { imageUrl: "./uploads/up_1007.jpg", name: "Historical Sites" },
    { imageUrl: "./uploads/up_1008.jpg", name: "Hidden Waterfalls" },
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
          <div>with Adventures</div>
          <Button text="Call Now" color="green" className="mt-10 px-10 py-2 text-white text-2xl" />
        </div>
      </div>

      {/* Who are we Section */}
      <div className="bg-white mt-72 md:pl-36 md:pr-36 mb-72 sm:pl-8 sm:pr-8">
        <Heading text="Who are we?" color="text-gray-600" />

        <div className="m-28"></div>

        {/* Map through the arrays and pass data to AboutComponent */}
        {imageUrls.map((imageUrl, index) => (
          <AboutComponent
            key={index}
            imageUrl={imageUrl}
            paragraphText={paragraphTexts[index % paragraphTexts.length]}
            image_side={index % 2 === 0 ? "left" : "right"} // Odd index: left, Even index: right
          />
        ))}
      </div>

      <div className="m-96 p-48"></div>

      {/* Take a Ride Section */}
      <div className="bg-green-300 mt-72 md:pl-36 md:pr-36 mb-72 sm:pl-8 sm:pr-8 pt-36 pb-36">
        <Heading text="Wanna go a ride?" color="text-gray-600" />
        <div className="m-40"></div>
        <SubHeading text="Destinations" color="text-gray-600" />
        <div className="m-10"></div>
        <Description
          text="With our reliable Tuk Tuk services, years of driving expertise, and a passion for sharing the local culture, we’ll ensure your adventure is both safe and exciting."
          color="text-gray-600"
        />

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {destinations.map((destination, index) => (
            <Destination key={index} imageUrl={destination.imageUrl} name={destination.name} />
          ))}
        </div>
      </div>
    </>
  );
}
