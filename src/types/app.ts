// Types untuk aplikasi
export enum AppStep {
  Welcome,
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  NameInput,
  EmailInput,
  Confirmation,
  Complete,
}

export interface AppState {
  currentStep: AppStep;
  firstName: string;
  email: string;
  isLoading: boolean;
  hexagonLoaded: boolean;
}

export type AppAction =
  | { type: 'SET_STEP'; payload: AppStep }
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_HEXAGON_LOADED'; payload: boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'RESET_APP' };