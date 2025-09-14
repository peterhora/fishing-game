
import React from 'react';

interface ControlPanelProps {
  score: number;
  problemNumber: number;
  onHintClick: () => void;
  onNewProblemClick: () => void;
  onResetClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ score, problemNumber, onHintClick, onNewProblemClick, onResetClick }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl bg-[#0D3654]/70 backdrop-blur-lg text-white p-3 rounded-xl shadow-lg border-2 border-[#FFD700]/50 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <div className="text-lg">
          <span className="font-bold text-[#FFD700]">Score:</span> {score}
        </div>
        <div className="text-lg hidden sm:block">
          <span className="font-bold text-[#FFD700]">Problem:</span> {problemNumber}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ControlButton onClick={onHintClick}>💡 Hint</ControlButton>
        <ControlButton onClick={onNewProblemClick}>🔄 New</ControlButton>
        <ControlButton onClick={onResetClick}>🗑️ Reset</ControlButton>
      </div>
    </div>
  );
};

interface ControlButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base bg-[#FFD700] text-[#0D3654] font-bold rounded-lg hover:bg-yellow-300 active:scale-95 transition-all duration-150 shadow-md"
    >
        {children}
    </button>
);

export default ControlPanel;
