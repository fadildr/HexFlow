import React, { useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  color?: string;
  glowColor?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  charDelay = 50,
  color = "rgba(255, 255, 255, 1)",
  glowColor = "rgba(255, 255, 255, 0.3)",
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    element.textContent = "";
    let characterCount = 0;

    // Pecah teks menjadi kata-kata
    const words = text.split(" ");

    words.forEach((word) => {
      // Buat kontainer untuk setiap kata agar tidak terpotong
      const wordWrapper = document.createElement("span");
      wordWrapper.style.display = "inline-block";
      wordWrapper.style.marginRight = "0.5em";
      wordWrapper.style.fontFamily = "'Bagoss', sans-serif"; // Tambahkan font Bagoss

      // Buat span untuk setiap huruf di dalam kata
      [...word].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.color = "rgba(255, 255, 255, 0.1)";
        span.style.textShadow = "none";
        span.style.transition = `color 0.5s ease, text-shadow 0.5s ease`;
        span.style.fontFamily = "'Bagoss', sans-serif"; // Tambahkan font Bagoss

        wordWrapper.appendChild(span);

        // Tunda animasi berdasarkan urutan karakter global
        setTimeout(() => {
          span.style.color = color;
          span.style.textShadow = `0 0 8px ${glowColor}`;
        }, delay + characterCount * charDelay);

        characterCount++;
      });

      element.appendChild(wordWrapper);
    });

    return () => {
      if (element) {
        element.textContent = text;
      }
    };
  }, [text, delay, charDelay, color, glowColor]);

  return (
    <div
      ref={textRef}
      className={`font-bagoss ${className}`}
      style={{ fontFamily: "'Bagoss', sans-serif" }}
    >
      {text}
    </div>
  );
};
