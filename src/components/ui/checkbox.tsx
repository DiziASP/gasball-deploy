import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void; // Fungsi onChange untuk mengirim nilai terpilih
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    const updatedChecked = !checked; // Inversi nilai saat checkbox diklik
    setChecked(updatedChecked);
    onChange(updatedChecked); // Panggil fungsi onChange dengan nilai yang baru
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
