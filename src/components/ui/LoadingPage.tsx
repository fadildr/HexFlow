import React, { useState, useEffect } from "react";
import { LottieHexagon } from "@/components/ui/LottieHexagon";

interface LoadingPageProps {
  message?: string;
  onHexagonLoaded?: (loaded: boolean) => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  message = "Loading...",
  onHexagonLoaded,
}) => {
  const [hexagonLoaded, setHexagonLoaded] = useState(false);
  useEffect(() => {
    if (hexagonLoaded && onHexagonLoaded) {
      onHexagonLoaded(true);
    }
  }, [hexagonLoaded, onHexagonLoaded]);

  return (
    <div className="min-h-screen bg-[#0C0D10] flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
        <LottieHexagon onLoad={() => setHexagonLoaded(true)} />
      </div>

      <div className="text-white text-xl font-medium">{message}</div>

      <div className="mt-8 flex space-x-3">
        <div
          className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};
