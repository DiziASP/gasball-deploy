import React, { useState } from 'react';

interface RadioGroupProps {
  options: string[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => (
        <label key={index} className="inline-flex items-center space-x-2 cursor-pointer text-sm mt-1">
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



// import React from 'react';

// interface RadioGroupProps {
//   options: string[];
//   selectedOption: string;
//   onChange: (selected: string) => void;
// }

// const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedOption, onChange }) => {
//   const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(event.target.value);
//   };

//   return (
//     <div className='flex flex-col gap-2 mt-1'>
//       {options.map((option, index) => (
//         <label key={index} className="inline-flex items-center text-sm">
//           <input
//             type="radio"
//             value={option}
//             checked={selectedOption === option}
//             onChange={handleOptionChange}
//             className="form-radio h-4 w-4 text-indigo-600 focus:bg-black indeterminate:bg-gray-300 checked:bg-blue-500 focus:ring-indigo-500 "
//           />
//           <span className="ml-2">{option}</span>
//         </label>
//       ))}
//     </div>
//   );
// };

// export default RadioGroup;
