import { useReducer, useCallback, useEffect } from 'react';
import { appReducer, initialState } from '@/reducers/appReducer';
import { AppStep } from '@/types/app';
import { LOADING_TIMEOUT } from '@/constants/app';

export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setStep: useCallback((step: AppStep) => {
      dispatch({ type: 'SET_STEP', payload: step });
    }, []),

    setFirstName: useCallback((name: string) => {
      dispatch({ type: 'SET_FIRST_NAME', payload: name });
    }, []),

    setEmail: useCallback((email: string) => {
      dispatch({ type: 'SET_EMAIL', payload: email });
    }, []),

    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    setHexagonLoaded: useCallback((loaded: boolean) => {
      dispatch({ type: 'SET_HEXAGON_LOADED', payload: loaded });
    }, []),

    goToNextStep: useCallback(() => {
      dispatch({ type: 'NEXT_STEP' });
    }, []),

    goToPreviousStep: useCallback(() => {
      dispatch({ type: 'PREVIOUS_STEP' });
    }, []),

    resetApp: useCallback(() => {
      dispatch({ type: 'RESET_APP' });
    }, []),
  };

  useEffect(() => {
    if (state.hexagonLoaded) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      }, LOADING_TIMEOUT);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [state.hexagonLoaded]);

  return { state, actions };
}
