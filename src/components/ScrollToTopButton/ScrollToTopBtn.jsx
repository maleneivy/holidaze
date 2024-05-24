'use client';
import React, { useState, useEffect } from 'react';

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    const windowHeight = window.innerHeight;
    setIsVisible(position > (windowHeight < 768 ? 3000 : 5000));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-20 z-50 rounded-full bg-lightGreen p-3 text-primary shadow-lg transition-opacity duration-300 hover:bg-lightBlueGrey hover:text-darkBlue ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Go to top
    </button>
  );
};

export default ScrollToTopBtn;
