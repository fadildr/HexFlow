import dynamic from 'next/dynamic';

// Import komponen ringan secara langsung
export { Header } from './ui/Header';

// Lazy load komponen animasi berat
export const LottieHexagon = dynamic(
  () =>
    import('./ui/LottieHexagon').then(mod => ({ default: mod.LottieHexagon })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full animate-pulse bg-purple-900/20 rounded-full" />
    ),
  }
);

export const HexagonSvg = dynamic(
  () => import('./ui/HexagonSvg').then(mod => ({ default: mod.HexagonSvg })),
  { ssr: true }
);

export const FloatingText = dynamic(
  () =>
    import('./ui/FloatingText').then(mod => ({ default: mod.FloatingText })),
  { ssr: true }
);

export const AnimatedText = dynamic(
  () =>
    import('./ui/AnimatedText').then(mod => ({ default: mod.AnimatedText })),
  { ssr: true }
);
export { LoadingPage } from './ui/LoadingPage';
export { WelcomeScreen } from './steps/WelcomeScreen';
export { OnboardingStep } from './steps/OnboardingStep';
export { InputStep } from './steps/InputStep';
export { ConfirmationStep } from './steps/ConfirmationStep';
