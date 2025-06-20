import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  showBackButton = false, 
  onBack, 
  onRefresh 
}) => {
  return (
    <header className="relative flex items-center p-4 pt-12 md:pt-6">
      {/* Sisi kiri - fixed width untuk konsistensi */}
      <div className="flex items-center w-16">
        {showBackButton && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
      
      {/* Judul di tengah - absolute positioning */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold tracking-wide">
        juicebox
      </h1>
      
      {/* Sisi kanan - fixed width untuk konsistensi */}
      <div className="flex items-center justify-end w-16 ml-auto">
        <button 
          onClick={onRefresh}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  );
};