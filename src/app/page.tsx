'use client';

import React, { useEffect, useState } from 'react';
import AboutComponent from './components/about_component';
import Button from './components/button';
//import ContactSection from './components/contact';
import Description from './components/description';
//import Destination from './components/destination';
import Footer from './components/footer';
import Heading from './components/heading';
import NavBar from './components/navbar';
import Spinner from './components/spinner';
import SubHeading from './components/sub_heading';
import ContactSection from './components/contact';
import Destination from './components/destination';
import Map from './components/map';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const imageUrls = [
    './uploads/up_1000.jpg',
    './uploads/up_1001.jpg',
    './uploads/up_1002.jpg',
    './uploads/up_1003.jpg',
    './uploads/up_1004.jpg',
    './uploads/up_1005.jpg',
    './uploads/up_1006.jpg',
    './uploads/up_1007.jpg',
  ];

  useEffect(() => {
    // Function to preload all images
    const preloadImages = () => {
      return Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
    };

    // Wait for both window load and images to preload
    const handleLoad = async () => {
      try {
        await preloadImages();
      } finally {
        setIsLoading(false);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  


  

  const paragraphTexts = [
    'We are a team of passionate individuals committed to delivering excellence. Our mission is to create innovative solutions and provide outstanding service to our clients. Join us in our journey!',
    'Our expertise spans across various industries, and we pride ourselves on our adaptability. We work closely with clients to ensure their needs are met with precision and care.',
    'Innovation and creativity are at the core of what we do. Our team constantly pushes the boundaries to deliver unique and impactful solutions for every project we undertake.',
  ];

  
  const destinations = [
    { imageUrl: './uploads/up_1001.jpg', name: 'Sunny Beach' },
    { imageUrl: './uploads/up_1002.jpg', name: 'Mountain View' },
    { imageUrl: './uploads/up_1003.jpg', name: 'Tropical Paradise' },
    { imageUrl: './uploads/up_1004.jpg', name: 'Desert Dunes' },
    { imageUrl: './uploads/up_1005.jpg', name: 'City Skyline' },
    { imageUrl: './uploads/up_1006.jpg', name: 'River Adventure' },
    { imageUrl: './uploads/up_1007.jpg', name: 'Historical Sites' },
    { imageUrl: './uploads/up_1008.jpg', name: 'Hidden Waterfalls' },
  ]

  function handleCallNowClick(): void {
    window.location.href = 'tel:+94762278270';
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <NavBar />
      </div>

     {/* Hero Section */}
<div className="relative h-screen bg-home-bg" id="home">
  <div className="h-full sm:h-1/2 md:h-full flex flex-col items-center justify-center text-center font-semibold text-white">
    <img src="/logo.png" alt="Logo" className="sm:hidden h-40 w-auto mb-8" />

    <div className="text-4xl sm:text-5xl md:text-7xl">
      Capture Your <span style={{ color: 'yellow' }}>Memories</span>
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

        {imageUrls.map((imageUrl, index) => (
          <AboutComponent key={index} imageUrl={imageUrl} paragraphText={paragraphTexts[index % paragraphTexts.length]} image_side={index % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>
      

       {/* Take a Ride Section */}
       <div className="bg-white">
         <div className="relative top-0 left-0 w-full overflow-hidden leading-none">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
        className="fill-gray-100"
      ></path>
    </svg>
  </div>
      <div className="bg-gray-100 md:mt-0 md:mb-72 mt-0 mb-20 md:pl-36 md:pr-36 pl-8 pr-8 pt-36 pb-36" id="ride">
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
        {/*}
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
            </div>*/}

            {/* Curved SVG */}

  </div>
</div>


      <div className="md:h-40 h-0"></div>
      {/* Contact Us Section */}
      <div className="bg-white md:mt-72 md:pl-36 md:pr-36 md:mb-72 sm:pl-8 sm:pr-8" id="contact">
        <div className="h-40"></div>
        <Heading text="Reach out us" color="text-gray-600" />
        <div className="m-20"></div>
        <div className="grid grid-cols-1 sm:grid-cols-5 md:gap-10 sm:gap-0">

          <div className="col col-span-3">
            <div className="m-10"></div>
            <Map/>
            <div className="m-48"></div>
          </div>
          <div
  className="col col-span-2 bg-yellow-300 rounded-2xl pl-4 pr-4 shadow-2xl md:mx-auto mt-20 mx-4"
  id="contact-us-section"
>
  <div className="m-10"></div>
  <div className="text-center">
    <SubHeading text="Contacts" color="text-gray-600" />
  </div>
  <div className="m-10"></div>
  <ContactSection contactType="phone" description="+94776328270" />
  <div className="m-1"></div>
  <ContactSection contactType="phone" description="+94762278270" />
  <div className="m-1"></div>
  <ContactSection
    contactType="address"
    description="18, St Andrew's Rd, Nuwara Eliya. 22200"
  />
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