import React from "react";
import Lottie from "lottie-react";
import hexagonLottie from "../../../public/assets/JB2G_Lottie.json";

interface LottieHexagonProps {
  // Size sebagai angka dalam piksel, opsional
  size?: number;
  // Callback ketika animasi selesai dimuat
  onLoad?: () => void;
}

export const LottieHexagon: React.FC<LottieHexagonProps> = ({
  size,
  onLoad,
}) => {
  // Jika size tidak diisi, gunakan style untuk full width dan height
  const sizeStyle = size
    ? { width: `${size}px`, height: `${size}px` }
    : { width: "100%", height: "100%" };

  const handleComplete = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <div className="relative" style={sizeStyle}>
      <Lottie
        animationData={hexagonLottie}
        loop={true}
        autoplay={true}
        onComplete={handleComplete}
        onLoopComplete={handleComplete}
        className="w-full h-full object-contain hover:scale-110 transition-all duration-300 "
        // style={{
        //   filter: 'hue-rotate(250deg) saturate(1.3) brightness(1.1) contrast(1.2)'
        // }}
      />
    </div>
  );
};
