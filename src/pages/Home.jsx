import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import PopularAlbumsSection from '../components/PopularAlbumsSection';
import ChartCreatorSection from '../components/ChartCreatorSection';
import ConnectSection from '../components/ConnectSection';
import Carrusel from '../components/Carrusel';
import CTASection from '../components/CTASection';

import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-black via-purple-900 to-black text-white min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="flex flex-col md:flex-row items-center justify-center gap-0 px-8 md:px-24 py-16">
        <div className="w-full md:w-1/2 relative h-[400px]">
          <Carrusel />
        </div>
        <div className="w-full md:w-1/2">
          <Hero />
        </div>
      </section>
      <PopularAlbumsSection />
      <FeaturesSection />
      <ChartCreatorSection />
      <ConnectSection/>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
