import { AppStep } from "@/types/app";

// Constants untuk aplikasi
export const LOADING_TIMEOUT = 2000;
export const ANIMATION_DURATION = 800;

export const ONBOARDING_STEP_PROPS = {
  [AppStep.OnboardingStep1]: {
    title:
      "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
    currentStep: 1,
    totalSteps: 3,
    buttonText: "Continue",
  },
  [AppStep.OnboardingStep2]: {
    title:
      "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
    currentStep: 2,
    totalSteps: 3,
    buttonText: "Continue",
  },
  [AppStep.OnboardingStep3]: {
    title:
      "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
    currentStep: 3,
    totalSteps: 3,
    buttonText: "Get started",
    isLastStep: true,
  },
} as const;
