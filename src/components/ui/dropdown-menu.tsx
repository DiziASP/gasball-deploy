"use client";

import React, { useState } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

interface DropdownProps {
  options: { label: string; link: string }[]; // Menyediakan label dan link untuk setiap opsi
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (link: string) => {
    setIsOpen(false); // Tutup dropdown setelah opsi dipilih
    // Lakukan navigasi ke link tertentu saat opsi dipilih
    // Misalnya, menggunakan react-router-dom:
    // history.push(link);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown}>
        <DotsVerticalIcon />
      </button>
      {isOpen && (
        <div
          className="origin-top-left absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <div key={index}>
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  onClick={() => handleOptionClick(option.link)}
                >
                  {option.label}
                </div>
                {index !== options.length - 1 && (
                  <hr className="mx-2 border-t border-gray-200" role="none" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
