import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer text-sm mt-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-4 w-4 checked:bg-black checked:border-transparent"
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
