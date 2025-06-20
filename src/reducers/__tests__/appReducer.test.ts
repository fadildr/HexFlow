import { describe, it, expect } from 'vitest';
import { appReducer } from '../appReducer';
import { AppState, AppAction } from '@/types/app';

const initialState: AppState = {
  currentStep: 0,
  firstName: '',
  email: '',
  isLoading: false,
  hexagonLoaded: false,
};

describe('appReducer', () => {
  it('should return initial state', () => {
    const action: { type: string } = { type: 'UNKNOWN_ACTION' };
    const state = appReducer(initialState, action as AppAction);
    expect(state).toEqual(initialState);
  });

  it('should handle SET_FIRST_NAME', () => {
    const action: AppAction = {
      type: 'SET_FIRST_NAME',
      payload: 'John',
    };
    const newState = appReducer(initialState, action);
    expect(newState.firstName).toBe('John');
  });

  it('should handle SET_EMAIL', () => {
    const action: AppAction = {
      type: 'SET_EMAIL',
      payload: 'john@example.com',
    };
    const newState = appReducer(initialState, action);
    expect(newState.email).toBe('john@example.com');
  });

  it('should handle NEXT_STEP', () => {
    const action: AppAction = { type: 'NEXT_STEP' };
    const newState = appReducer(initialState, action);
    expect(newState.currentStep).toBe(1);
  });

  it('should handle PREVIOUS_STEP', () => {
    const state = { ...initialState, currentStep: 2 };
    const action: AppAction = { type: 'PREVIOUS_STEP' };
    const newState = appReducer(state, action);
    expect(newState.currentStep).toBe(1);
  });

  it('should handle SET_LOADING', () => {
    const action: AppAction = {
      type: 'SET_LOADING',
      payload: true,
    };
    const newState = appReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle SET_HEXAGON_LOADED', () => {
    const action: AppAction = {
      type: 'SET_HEXAGON_LOADED',
      payload: true,
    };
    const newState = appReducer(initialState, action);
    expect(newState.hexagonLoaded).toBe(true);
  });

  it('should handle RESET_APP', () => {
    const modifiedState: AppState = {
      currentStep: 3,
      firstName: 'John',
      email: 'john@example.com',
      isLoading: true,
      hexagonLoaded: true,
    };

    const action: AppAction = { type: 'RESET_APP' };
    const newState = appReducer(modifiedState, action);

    expect(newState).toEqual({
      currentStep: 0,
      firstName: '',
      email: '',
      isLoading: false,
      hexagonLoaded: true, // Keep as true since that's the actual behavior
    });
  });
});
