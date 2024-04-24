"use client"

const { Icon } = require("@/utils/icons");
const { useState } = require("react");
const { default: Links } = require("../links/Links");

const DropDownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="p-2">
                {isOpen ? (
                    <Icon name="close" className="w-10 h-10 text-blue" />
                ) : (
                    <Icon name="bars" className="w-10 h-10 text-blue" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 w-64 py-2 text-center bg-darkBlue text-light shadow-xl h-screen">
                    <Links onLinkClick={closeMenu}/>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu; 