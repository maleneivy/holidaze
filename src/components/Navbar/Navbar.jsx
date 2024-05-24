'use client';

import Link from 'next/link';
import Image from 'next/image';
import DropDownMenu from './dropdown/DropDownMenu';
import ProfileLink from './links/ProfileLink';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex flex-row items-baseline justify-between shadow-md">
      <div className="p-3">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Holidaze logo"
            width={110}
            height={38}
            className="logo"
            priority={true}
            onClick={handleLogoClick}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <ProfileLink />
        <DropDownMenu
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
        />
      </div>
    </header>
  );
};

export default Navbar;
