
import React from 'react';
import { PRIZES, COLORS } from '../constants';

interface WheelProps {
  rotation: number;
}

const Wheel: React.FC<WheelProps> = ({ rotation }) => {
  const prizeCount = PRIZES.length;
  const segmentDegrees = 360 / prizeCount;

  const conicGradient = COLORS.map((color, index) => {
    const startAngle = index * segmentDegrees;
    const endAngle = (index + 1) * segmentDegrees;
    return `${color} ${startAngle}deg ${endAngle}deg`;
  }).join(', ');

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      {/* Pointer */}
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.3))' }}>
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600"></div>
      </div>
      
      {/* Wheel */}
      <div
        className="relative w-full h-full rounded-full border-8 border-yellow-400 shadow-xl transition-transform duration-[5000ms] ease-out"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: `conic-gradient(${conicGradient})`,
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          {PRIZES.map((prize, index) => {
            const angle = segmentDegrees * index + segmentDegrees / 2;
            return (
              <div
                key={index}
                className="absolute w-full h-full flex justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <span 
                  className="absolute top-[10%] text-white font-bold text-sm md:text-base select-none"
                  style={{ transform: 'rotate(90deg)' }}
                >
                  {prize}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-gray-400"></div>
      </div>
    </div>
  );
};

export default Wheel;
