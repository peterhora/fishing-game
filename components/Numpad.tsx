import React from 'react';

interface NumpadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onSubmit: () => void;
}

const NumpadButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl font-bold bg-[#1E5A8E] text-white rounded-lg border-2 border-[#4682B4] hover:bg-[#4682B4] active:scale-95 transition-all duration-150 shadow-md ${className}`}
  >
    {children}
  </button>
);

const Numpad: React.FC<NumpadProps> = ({ onInput, onClear, onSubmit }) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="grid grid-cols-3 gap-2 p-2 md:p-4 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl border-2 border-white/30">
      {buttons.map(num => (
        <NumpadButton key={num} onClick={() => onInput(num)}>
          {num}
        </NumpadButton>
      ))}
      <NumpadButton onClick={onClear} className="text-xl md:text-2xl">X</NumpadButton>
      <NumpadButton onClick={() => onInput('0')}>0</NumpadButton>
      <NumpadButton onClick={onSubmit} className="text-xl md:text-2xl bg-green-600 hover:bg-green-500 border-green-700">OK</NumpadButton>
    </div>
  );
};

export default Numpad;