'use client'

import AboutComponent from "./components/about_component";
import Button from "./components/button";
import ContactSection from "./components/contact";
import Description from "./components/description";
import Destination from "./components/destination"; // Import Destination Component
import Footer from "./components/footer";
import Heading from "./components/heading";
import NavBar from "./components/navbar";
import Package from "./components/package";
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

  const packages = [
  {
    packageName: "Tropical Paradise Getaway",
    price: 20000,
    priceLimit: "onwards",
    imageUrl: "./uploads/up_1000.jpg",
    description:
      "Enjoy a relaxing trip to the tropical islands with our exclusive getaway package. Includes meals and accommodation.",
    location: ['Colombo', 'Galle', 'Kandy', 'Jaffna'],
    activities: ['Snorkeling', 'Surfing', 'Beach Volleyball', 'Sunbathing']
  },
  {
    packageName: "Mountain Adventure Trek",
    price: 15000,
    priceLimit: "up to",
    imageUrl: "./uploads/up_1001.jpg",
    description:
      "Explore the breathtaking mountain trails with our guided trekking packages. Perfect for adventure enthusiasts!",
    location: ['Colombo', 'Galle', 'Kandy', 'Jaffna'],
    activities: ['Snorkeling', 'Surfing', 'Beach Volleyball', 'Sunbathing']
  },
  {
    packageName: "City Tour Deluxe",
    price: 5000,
    priceLimit: "equal",
    imageUrl: "./uploads/up_1002.jpg",
    description:
      "Discover the city's iconic landmarks and hidden gems with our deluxe city tour package.",
    location: ['Colombo', 'Galle', 'Kandy', 'Jaffna'],
    activities: ['Snorkeling', 'Surfing', 'Beach Volleyball', 'Sunbathing']
  },
  {
    packageName: "Desert Safari Adventure",
    price: 10000,
    priceLimit: "onwards",
    imageUrl: "./uploads/up_1003.jpg",
    description:
      "Embark on an unforgettable journey through the dunes with our exciting desert safari packages.",
    location: ['Colombo', 'Galle', 'Kandy', 'Jaffna'],
    activities: ['Snorkeling', 'Surfing', 'Beach Volleyball', 'Sunbathing']
  },
  {
    packageName: "Historical Exploration",
    price: 8000,
    priceLimit: "up to",
    imageUrl: "./uploads/up_1004.jpg",
    description:
      "Dive into the rich history and culture of ancient landmarks with our guided historical exploration tours.",
    location: ['Colombo', 'Galle', 'Kandy', 'Jaffna'],
    activities: ['Snorkeling', 'Surfing', 'Beach Volleyball', 'Sunbathing']
  },
  {
    packageName: "Beachside Relaxation",
    price: 12000,
    priceLimit: "onwards",
    imageUrl: "./uploads/up_1005.jpg",
    description:
      "Relax by the serene beaches with our beachside vacation packages. Perfect for unwinding and enjoying nature.",
    location: ['Colombo', 'Galle', 'Kandy', 'Jaffna'],
    activities: ['Snorkeling', 'Surfing', 'Beach Volleyball', 'Sunbathing']
  },
];

  function handleCallNowClick(): void {
  window.location.href = "tel:+94762278270";
}


  return (
    <>
      <div style={{ position: "relative" }}>
        <NavBar />
      </div>

      {/* Hero Section */}
<div className="h-screen bg-home-bg" id="home">
  <div className="h-full sm:h-1/2 md:h-full flex flex-col items-center justify-center text-center font-semibold text-white">
    {/* Logo for small devices */}
    <img
      src="/logo.png"
      alt="Logo"
      className="sm:hidden h-40 w-auto mb-8"
    />
    
    <div className="text-4xl sm:text-5xl md:text-7xl">
      Capture Your <span style={{ color: "yellow" }}>Memories</span>
    </div>
    <div className="text-4xl sm:text-6xl md:text-7xl">with Adventures</div>
    <Button
      text="Call Now"
      color="red"
      className="mt-10 px-10 py-2 text-2xl sm:text-xl md:text-2xl"
      onClick={handleCallNowClick}
    />
  </div>
</div>

      <div className="md:h-40 sm:h-10"></div>

      {/* Who are we Section */}
      <div className="bg-white md:mt-72 md:mb-72 md:pl-36 md:pr-36 sm:pl-8 sm:pr-8 sm:mt-10 sm:mb-10" id="about">
        <div className="h-40"></div>
        
        <Heading text="Who are we?" color="text-gray-600" />

        <div className="md:h-28 h-20"></div>

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

      <div className="md:h-40 sm:h-10"></div>

      {/* Take a Ride Section */}
      <div className="bg-gray-100 mt-72 mb-72 md:pl-36 md:pr-36 pl-8 pr-8 pt-36 pb-36" id="ride">
        <Heading text="Wanna go a ride?" color="text-gray-600" />
        <div className="h-40"></div>
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

        <div className="m-40"></div>
        <SubHeading text="Packages" color="text-gray-600" />
        <div className="m-10"></div>
        <Description
          text="With our reliable Tuk Tuk services, years of driving expertise, and a passion for sharing the local culture, we’ll ensure your adventure is both safe and exciting."
          color="text-gray-600"
        />
        <div className="m-10"></div>
        {/* Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {packages.map((pkg, index) => (
                <Package
                 key={index}
                  packageName={pkg.packageName}
                  price={pkg.price}
                  priceLimit={pkg.priceLimit}
                  imageUrl={pkg.imageUrl}
                  description={pkg.description}
                  locations={pkg.location}
                  activities={pkg.activities}
                />
              ))}
            </div>
      </div>



      <div className="h-40"></div>
      {/* Contact Us Section */}
      <div className="bg-white mt-72 md:pl-36 md:pr-36 mb-72 sm:pl-8 sm:pr-8" id="contact">
        <div className="h-40"></div>
        <Heading text="Reach out us" color="text-gray-600" />
        <div className="m-20"></div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-10">

          <div className="col col-span-3">
            <div className="m-10"></div>
           <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.269392066728!2d80.7640419!3d6.9775079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3817dd8000e6f%3A0x511d2aeb3484e3ef!2sArun%20Home%20Decor!5e0!3m2!1sen!2slk!4v1733515033206!5m2!1sen!2slk"
  style={{ border: 0, width: "100%", height: "100%" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

              <div className="m-10"></div>
          </div>

          <div className="col col-span-2 bg-yellow-300 rounded-2xl pl-4 pr-4 shadow-2xl">

            <div className="m-10"></div>
            <div className="text-center">
              <SubHeading text="Contacts" color="text-gray-600" />
            </div>            
            <div className="m-10"></div>
            <ContactSection contactType="phone" description="+94776328270" />
            <div className="m-1"></div>
            <ContactSection contactType="phone" description="+94762278270" />
            <div className="m-1"></div>
            <ContactSection contactType="address" description="18, St Andrew's Rd, Nuwara Eliya. 22200" />
            <div className="m-1"></div>
            <ContactSection contactType="email" description="aasanth673@gmail.com" />
            <div className="m-10"></div>
          </div>

        </div>
        <div className="m-28"></div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
