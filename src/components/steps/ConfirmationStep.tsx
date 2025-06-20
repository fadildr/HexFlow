import React from "react";
import { LottieHexagon } from "@/components/ui/LottieHexagon";
interface ConfirmationStepProps {
  name: string;
  onContinue: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  name,
  onContinue,
}) => {
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
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-6">
          Thanks, <span className="text-purple-400">{name}</span>! Now, it&apos;s
          time to get a reality check.
        </h2>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          This will take 2-3 minutes.
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={onContinue}
        className="w-full max-w-sm bg-white text-gray-900 py-4 px-8 rounded-2xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-white/10"
      >
        Continue
      </button>
    </div>
  );
};
