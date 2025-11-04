"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const Accordion = ({ title, children, defaultOpen = true }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-3 text-left text-md rounded font-semibold text-gray-800 bg-gray-100 px-2"
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;