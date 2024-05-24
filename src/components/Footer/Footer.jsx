import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col items-center justify-between p-10 shadow-inner md:flex-row md:p-6">
      <div className="flex items-center space-x-2">
        <Image
          src="/small-logo.png"
          alt="Holidaze logo"
          width={50}
          height={50}
        />
        <span className="text-lg md:text-xl">Where your vacation begins.</span>
      </div>
      <div className="mt-4 md:mt-0">
        <span className="text-darkGrey text-sm">@2024 Holidaze</span>
      </div>
    </footer>
  );
};

export default Footer;
