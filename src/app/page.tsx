"use client";

import { Header, LoadingPage } from "@/components";
import { useAppState } from "@/hooks/useAppState";
import { AppStep } from "@/types/app";
import { ONBOARDING_STEP_PROPS } from "@/constants/app";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load komponen berdasarkan langkah
const WelcomeScreen = dynamic(() => import('@/components').then(mod => ({ default: mod.WelcomeScreen })));
const OnboardingStep = dynamic(() => import('@/components').then(mod => ({ default: mod.OnboardingStep })));
const InputStep = dynamic(() => import('@/components').then(mod => ({ default: mod.InputStep })));
const ConfirmationStep = dynamic(() => import('@/components').then(mod => ({ default: mod.ConfirmationStep })));

// Placeholder untuk lazy loading
const StepPlaceholder = () => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <div className="w-64 h-64 rounded-full bg-purple-900/20 animate-pulse"></div>
  </div>
);

export default function HomePage() {
  const { state, actions } = useAppState();

  const handleHexagonLoaded = () => {
    actions.setHexagonLoaded(true);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle back navigation
  const handleBack = () => {
    switch (state.currentStep) {
      case AppStep.OnboardingStep2:
        actions.setStep(AppStep.OnboardingStep1);
        break;
      case AppStep.OnboardingStep3:
        actions.setStep(AppStep.OnboardingStep2);
        break;
      case AppStep.NameInput:
        actions.setStep(AppStep.OnboardingStep3);
        break;
      case AppStep.EmailInput:
        actions.setStep(AppStep.NameInput);
        break;
      case AppStep.Confirmation:
        actions.setStep(AppStep.EmailInput);
        break;
      default:
        // For Welcome step or others, don't go back
        break;
    }
  };

  // Function to determine if back button should be shown
  const shouldShowBackButton = () => {
    return state.currentStep !== AppStep.Welcome && !state.isLoading;
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case AppStep.Welcome:
        return (
          <Suspense fallback={<StepPlaceholder />}>
            <WelcomeScreen
              onGetStarted={() => actions.setStep(AppStep.OnboardingStep1)}
            />
          </Suspense>
        );

      case AppStep.OnboardingStep1:
        return (
          <OnboardingStep
            {...ONBOARDING_STEP_PROPS[AppStep.OnboardingStep1]}
            onContinue={() => actions.setStep(AppStep.OnboardingStep2)}
          />
        );

      case AppStep.OnboardingStep2:
        return (
          <OnboardingStep
            {...ONBOARDING_STEP_PROPS[AppStep.OnboardingStep2]}
            onContinue={() => actions.setStep(AppStep.OnboardingStep3)}
          />
        );

      case AppStep.OnboardingStep3:
        return (
          <OnboardingStep
            {...ONBOARDING_STEP_PROPS[AppStep.OnboardingStep3]}
            onContinue={() => actions.setStep(AppStep.NameInput)}
          />
        );

      case AppStep.NameInput:
        return (
          <InputStep
            title="What's your first name?"
            placeholder="Enter your first name"
            value={state.firstName}
            onChange={actions.setFirstName}
            onContinue={() => {
              if (state.firstName.trim()) {
                actions.setStep(AppStep.EmailInput);
              }
            }}
            inputType="text"
            canContinue={state.firstName.trim() !== ''}
          />
        );

      case AppStep.EmailInput:
        return (
          <InputStep
            title="What's your email address?"
            placeholder="Enter your email"
            value={state.email}
            onChange={actions.setEmail}
            onContinue={() => {
              if (isValidEmail(state.email)) {
                actions.setStep(AppStep.Confirmation);
              }
            }}
            inputType="email"
            canContinue={isValidEmail(state.email)}
          />
        );

      case AppStep.Confirmation:
        return (
          <ConfirmationStep
            name={state.firstName}
            onContinue={() => {
              actions.setLoading(true);
              setTimeout(() => {
                actions.setLoading(false);
                actions.setStep(AppStep.Welcome);
              }, 3000);
            }}
          />
        );

      default:
        return null;
    }
  };

  if (state.isLoading) {
    return (
      <LoadingPage
        message="Processing your reality check..."
        onHexagonLoaded={handleHexagonLoaded}
      />
    );
  }

  return (
    <div
      className="min-h-screen text-white grid grid-rows-[auto_1fr]"
      style={{
        background: 'linear-gradient(to bottom, #151620, #0C0D10)',
      }}
    >
      <Header
        showBackButton={shouldShowBackButton()}
        onBack={handleBack}
        onRefresh={() => window.location.reload()}
      />
      <main className="flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">{renderCurrentStep()}</div>
      </main>
    </div>
  );
}
