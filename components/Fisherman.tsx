import React from 'react';

const Fisherman: React.FC = () => (
  <div className="w-48 h-48 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      {/* Boat */}
      <path d="M 10 80 C 20 95, 80 95, 90 80 L 70 70 L 30 70 Z" fill="#A0522D" stroke="#69381b" strokeWidth="2" />
      
      {/* Fisherman Body */}
      <rect x="45" y="50" width="10" height="20" fill="#4a90e2" stroke="#1c3d5a" strokeWidth="1" />
      {/* Head */}
      <circle cx="50" cy="45" r="5" fill="#f5a623" stroke="#b87400" strokeWidth="1" />
      {/* Hat */}
      <rect x="46" y="38" width="8" height="3" fill="#d0021b" stroke="#8b0000" strokeWidth="0.5" />
      <rect x="44" y="41" width="12" height="2" fill="#d0021b" stroke="#8b0000" strokeWidth="0.5" />

      {/* Fishing Rod */}
      <line x1="55" y1="65" x2="20" y2="10" stroke="#502d16" strokeWidth="2" />
      {/* Fishing Line */}
      <line x1="20" y1="10" x2="20" y2="85" stroke="rgba(204, 204, 204, 0.7)" strokeWidth="1" />
    </svg>
  </div>
);

export default Fisherman;
