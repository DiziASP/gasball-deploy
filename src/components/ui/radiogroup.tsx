import { on } from 'events';
import React, { useState } from 'react';

interface RadioGroupProps {
  options: string[];
  onChange: (selected: string) => void; // Fungsi onChange untuk mengirim nilai terpilih
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => (
        <label
          key={index}
          className="inline-flex items-center space-x-2 cursor-pointer text-sm mt-1"
        >
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
            className="form-radio h-4 w-4 checked:bg-black checked:border-transparent"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
