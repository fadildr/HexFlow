import React from 'react';
import { HexagonSvg, FloatingText } from '@/components';
import { LazyLoad } from '@/components/ui/LazyLoad';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const floatingTextItems = [
  {
    text: 'WA businesses feel confident about future growth',
    position: 'top-8 left-4 md:top-12 md:left-6',
    maxWidth: 'max-w-[160px] md:max-w-[180px]',
    animation: 'fadeInUp',
    delay: '0.2s',
    transform: 'translateY(20px)',
  },
  {
    text: 'AI cant replace creativity',
    position: 'top-16 right-4 md:top-20 md:right-6',
    maxWidth: 'max-w-[120px] md:max-w-[140px] text-right',
    animation: 'fadeInUp',
    delay: '0.4s',
    transform: 'translateY(20px)',
  },
  {
    text: 'Sales measure true success',
    position: 'left-4 top-28 md:top-1/2   -translate-y-1/2 md:left-6',
    maxWidth: 'max-w-[100px] md:max-w-[120px]',
    animation: 'fadeInLeft',
    delay: '0.6s',
    transform: 'translateX(-20px)',
  },
  {
    text: 'Human connection drives WA business',
    position: 'right-4 bottom-28 md:right-6 md:bottom-24',
    maxWidth: 'max-w-[140px] md:max-w-[160px] text-right',
    animation: 'fadeInRight',
    delay: '0.8s',
    transform: 'translateX(20px)',
  },
  {
    text: 'The primary barrier to digital transformation is financial investment',
    position: 'bottom-8 left-4 md:bottom-12 md:left-6',
    maxWidth: 'max-w-[160px] md:max-w-[180px]',
    animation: 'fadeInUp',
    delay: '1s',
    transform: 'translateY(20px)',
  },
];
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
      {/* Hero Section with Floating Text */}
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mb-12 md:mb-16">
        <div className="relative">
          <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto flex items-center justify-center">
            <HexagonSvg />
          </div>

          <LazyLoad>
            <FloatingText items={floatingTextItems} />
          </LazyLoad>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2">
          Compare your thoughts on{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            technology
          </span>{' '}
          with current industry opinions.
        </h2>
      </div>

      {/* CTA Button */}
      <button
        onClick={onGetStarted}
        className="w-full max-w-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
      >
        Get a reality check
      </button>
    </div>
  );
};
