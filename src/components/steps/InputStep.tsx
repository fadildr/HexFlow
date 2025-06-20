import React from 'react';
import { LottieHexagon } from '@/components/ui/LottieHexagon';
interface InputStepProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  inputType?: 'text' | 'email';
  canContinue?: boolean;
}

export const InputStep: React.FC<InputStepProps> = ({
  title,
  placeholder,
  value,
  onChange,
  onContinue,
  inputType = 'text',
  canContinue = true,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue && value.trim()) {
      onContinue();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canContinue && value.trim()) {
      onContinue();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
      {/* Small Purple Hexagon */}
      <div className="mb-12 md:mb-16">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <LottieHexagon />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-12 md:mb-16 max-w-md md:max-w-lg">
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-8">
          {title}
        </h2>

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <input
              type={inputType}
              value={value}
              onChange={e => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent border-2 border-gray-600 rounded-2xl px-6 py-4 text-white text-lg placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors duration-200"
              autoFocus
            />
            {value.trim() && (
              <button
                type="button"
                onClick={onContinue}
                disabled={!canContinue}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
