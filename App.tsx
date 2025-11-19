
import React, { useState } from 'react';
import Wheel from './components/Wheel';
import PrizeModal from './components/PrizeModal';
import { PRIZES } from './constants';

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState<boolean>(() => {
    return localStorage.getItem('hasSpun') === 'true';
  });

  const handleSpinClick = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setWonPrize(null);

    const prizeCount = PRIZES.length;
    const winningPrizeIndex = Math.floor(Math.random() * prizeCount);
    const segmentDegrees = 360 / prizeCount;
    const spinDuration = 5000;

    const prizeAngle = (winningPrizeIndex * segmentDegrees) + (segmentDegrees / 2);
    const randomOffset = (Math.random() - 0.5) * (segmentDegrees * 0.8);
    const targetAngle = prizeAngle + randomOffset;
    
    const destinationAngle = 360 - targetAngle;

    const currentAngle = rotation % 360;
    const rotationNeeded = (destinationAngle - currentAngle + 360) % 360;
    
    const fullSpins = 5 * 360;
    
    const totalRotation = rotation + rotationNeeded + fullSpins;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(PRIZES[winningPrizeIndex]);
      setHasSpun(true);
      localStorage.setItem('hasSpun', 'true');
    }, spinDuration);
  };

  const handleCloseModal = () => {
    setWonPrize(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 to-indigo-900 text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
       <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 tracking-wider mb-8" style={{ textShadow: '2px 2px 0px #8B0000, 4px 4px 0px rgba(0,0,0,0.3)' }}>
        GUCCI LUCKY SPIN
      </h1>

      <Wheel
        rotation={rotation}
      />
      
      <div className="mt-20 text-center">
        <button
          onClick={handleSpinClick}
          disabled={isSpinning || hasSpun}
          className="px-16 py-3 bg-gradient-to-b from-red-500 to-red-700 text-white text-2xl font-bold rounded-xl border-b-4 border-red-900 shadow-lg transform active:scale-95 transition-transform duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 disabled:border-b-0 disabled:opacity-70"
          aria-label={hasSpun ? "Anda sudah melakukan spin" : "Putar roda keberuntungan"}
        >
          PUTAR
        </button>
      </div>

      {wonPrize && <PrizeModal prize={wonPrize} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
