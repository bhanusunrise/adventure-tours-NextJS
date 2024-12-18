'use client';

import { useEffect, useState } from 'react';
import AboutComponent from './components/about_component';
import Button from './components/button';
//import ContactSection from './components/contact';
//import Description from './components/description';
//import Destination from './components/destination';
import Footer from './components/footer';
import Heading from './components/heading';
import NavBar from './components/navbar';
//import SubHeading from './components/sub_heading';
import Spinner from './components/spinner';

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
  ];

  function handleCallNowClick(): void {
    window.location.href = 'tel:+94762278270';
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <NavBar />
      </div>

      {/* Hero Section */}
      <div className="h-screen bg-home-bg" id="home">
        <div className="h-full sm:h-1/2 md:h-full flex flex-col items-center justify-center text-center font-semibold text-white">
          <img src="/logo.png" alt="Logo" className="sm:hidden h-40 w-auto mb-8" />

          <div className="text-4xl sm:text-5xl md:text-7xl">
            Capture Your <span style={{ color: 'yellow' }}>Memories</span>
          </div>
          <div className="text-4xl sm:text-6xl md:text-7xl">with Adventures</div>
          <Button text="Call Now" color="red" className="mt-10 px-10 py-2 text-2xl sm:text-xl md:text-2xl" onClick={handleCallNowClick} />
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

      {/* Additional sections can follow here */}
      <Footer />
    </>
  );
}
