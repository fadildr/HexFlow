import React from "react";
import { HexagonSvg, AnimatedText } from "@/components";

interface OnboardingStepProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onContinue: () => void;
  buttonText?: string;
  isLastStep?: boolean;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  title,
  currentStep,
  totalSteps,
  onContinue,
  buttonText = "Continue",
  isLastStep = false,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
      {/* Small Purple Hexagon */}
      <div className="mb-12 md:mb-16">
        <div className="relative w-48 h-48 md:w-48 md:h-48">
          <HexagonSvg />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-12 md:mb-16 max-w-md md:max-w-lg lg:max-w-xl">
        <AnimatedText
          text={title}
          className="font-bagoss text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4 break-words"
          glowColor="rgba(128, 90, 213, 0.4)"
        />
      </div>

      {/* Progress Dots */}
      <div className="flex space-x-2 mb-8 md:mb-12">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentStep - 1
                ? "bg-purple-500"
                : index < currentStep - 1
                ? "bg-purple-600"
                : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={onContinue}
        className={`w-full max-w-sm py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg ${
          isLastStep
            ? "bg-white text-gray-900 hover:bg-gray-100 shadow-white/10"
            : "border-2 border-gray-600 text-white hover:border-purple-500 hover:bg-purple-500/10"
        } transform hover:scale-105`}
      >
        {buttonText}
      </button>
    </div>
  );
};
