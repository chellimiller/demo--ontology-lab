import store from './store';
import theme from './theme.slice';

describe('Theme state tests', () => {
  it('Should be initialized with user`s preference', () => {
    // Act
    const state = store.getState().theme;

    // Assert
    expect(state.mode).toEqual('dark');
  });

  it('Should change theme mode in state', () => {
    // Act
    store.dispatch(theme.actions.setMode('light'));
    const state = store.getState().theme;

    // Assert
    expect(state.mode).toEqual('light');
  });

  it('Should reset theme to window theme mode', () => {
    // Arrange
    store.dispatch(theme.actions.setMode('light'));

    // Act
    store.dispatch(theme.actions.resetMode());
    const state = store.getState().theme;

    // Assert
    expect(state.mode).toEqual('dark');
  });

  it('Should toggle theme mode', () => {
    // Arrange
    store.dispatch(theme.actions.setMode('light'));

    // Act
    store.dispatch(theme.actions.toggleMode());
    const state = store.getState().theme;

    // Assert
    expect(state.mode).toEqual('dark');
  });
});
