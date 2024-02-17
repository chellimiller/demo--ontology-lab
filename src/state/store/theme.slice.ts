import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const getDefaultMode = () => (isDarkMode() ? 'dark' : 'light');

export interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: getDefaultMode(),
};

type ThemeReducers = {
  toggleMode(state: ThemeState, action: Action): ThemeState;
  resetMode(state: ThemeState, action: Action): ThemeState;
  setMode(
    state: ThemeState,
    action: PayloadAction<ThemeState['mode']>
  ): ThemeState;
};

const getMode = (state: ThemeState) => state.mode;

const setMode = (state: ThemeState, mode: ThemeState['mode']): ThemeState => {
  if (state.mode === mode) return state;
  return { ...state, mode };
};

/**
 * function to create an initial state and the asscociated reducers
 */
const theme = createSlice<
  ThemeState,
  ThemeReducers,
  'theme',
  { getMode: typeof getMode }
>({
  name: 'theme',
  initialState: { ...initialState },
  reducers: {
    setMode: (state, action) => setMode(state, action.payload),
    resetMode: (state) => setMode(state, getDefaultMode()),
    toggleMode: (state) =>
      setMode(state, state.mode === 'dark' ? 'light' : 'dark'),
  },
  selectors: { getMode },
});

export default theme;
