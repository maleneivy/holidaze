'use client';

const { Icon } = require('@/utils/icons');
const { useState } = require('react');
const { default: Links } = require('../links/Links');

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? (
          <Icon name="close" className="h-10 w-10 text-blue" />
        ) : (
          <Icon name="bars" className="h-10 w-10 text-blue" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 h-screen w-64 bg-darkBlue py-2 text-center text-light shadow-xl">
          <Links onLinkClick={closeMenu} />
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
