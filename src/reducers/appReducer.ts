import { AppState, AppAction, AppStep } from "@/types/app";

export const initialState: AppState = {
  currentStep: AppStep.Welcome,
  firstName: "",
  email: "",
  isLoading: true,
  hexagonLoaded: false,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  try {
    switch (action.type) {
      case "SET_STEP":
        return { ...state, currentStep: action.payload };

      case "SET_FIRST_NAME":
        return { ...state, firstName: action.payload };

      case "SET_EMAIL":
        return { ...state, email: action.payload };

      case "SET_LOADING":
        return { ...state, isLoading: action.payload };

      case "SET_HEXAGON_LOADED":
        return { ...state, hexagonLoaded: action.payload };

      case "NEXT_STEP":
        return { ...state, currentStep: getNextStep(state.currentStep) };

      case "PREVIOUS_STEP":
        return { ...state, currentStep: getPreviousStep(state.currentStep) };

      case "RESET_APP":
        return {
          ...initialState,
          isLoading: false,
          hexagonLoaded: state.hexagonLoaded,
        };

      default:
        console.warn("Unknown action type:", action);
        return state;
    }
  } catch (error) {
    console.error("Reducer error:", error);
    return state;
  }
}

function getNextStep(currentStep: AppStep): AppStep {
  switch (currentStep) {
    case AppStep.Welcome:
      return AppStep.OnboardingStep1;
    case AppStep.OnboardingStep1:
      return AppStep.OnboardingStep2;
    case AppStep.OnboardingStep2:
      return AppStep.OnboardingStep3;
    case AppStep.OnboardingStep3:
      return AppStep.NameInput;
    case AppStep.NameInput:
      return AppStep.EmailInput;
    case AppStep.EmailInput:
      return AppStep.Confirmation;
    case AppStep.Confirmation:
      return AppStep.Complete;
    default:
      return currentStep;
  }
}

function getPreviousStep(currentStep: AppStep): AppStep {
  switch (currentStep) {
    case AppStep.OnboardingStep1:
      return AppStep.Welcome;
    case AppStep.OnboardingStep2:
      return AppStep.OnboardingStep1;
    case AppStep.OnboardingStep3:
      return AppStep.OnboardingStep2;
    case AppStep.NameInput:
      return AppStep.OnboardingStep3;
    case AppStep.EmailInput:
      return AppStep.NameInput;
    case AppStep.Confirmation:
      return AppStep.EmailInput;
    default:
      return currentStep;
  }
}
