
import React from 'react';
import { WHATSAPP_ADMIN_NUMBER } from '../constants';

interface PrizeModalProps {
  prize: string;
  onClose: () => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({ prize, onClose }) => {
  const message = encodeURIComponent(
    `Halo admin, saya telah memenangkan hadiah Lucky Spin sebesar ${prize}. Mohon bantuannya untuk klaim hadiah.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${message}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center max-w-sm w-full relative transform transition-all animate-jump-in">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
        <div className="text-yellow-500 text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Selamat!</h2>
        <p className="text-lg text-gray-600 mb-4">Anda memenangkan hadiah sebesar:</p>
        <p className="text-3xl font-extrabold text-purple-600 mb-6 bg-purple-50 py-3 rounded-lg">{prize}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Ambil Bonus Sekarang
        </a>
      </div>
    </div>
  );
};

export default PrizeModal;
