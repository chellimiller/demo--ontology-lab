import store from './store';
import dialog, { DialogKey } from './dialog.slice';

describe('store/dialog', () => {
  it('should be initialized with state', () => {
    // Arrange
    const state = store.getState().dialog;

    // Assert
    expect(state).toBeNull();
  });

  it('should be return dialog data', () => {
    // Arrange
    const payload = {
      key: DialogKey.CREDITS,
      data: {},
    };
    const expected = {
      type: 'dialog/open',
      payload,
    };

    // Act
    const result = store.dispatch(dialog.actions.open(payload));

    // Assert
    expect(result).toEqual(expected);
    expect(store.getState().dialog).toEqual(payload);
  });

  it('Should return state if payload === state', () => {
    // Arrange
    const payload = {
      key: DialogKey.CREDITS,
      data: {},
    };
    store.dispatch(dialog.actions.open(payload));
    const state = store.getState().dialog;
    const expected = {
      type: 'dialog/open',
      payload: store.getState().dialog,
    };

    // Act
    const result = store.dispatch(dialog.actions.open(payload));

    // Assert
    expect(result).toEqual(expected);
    expect(store.getState().dialog).toBe(state);
  });

  it('Should return correct action on dialog/close call', () => {
    // Arrange
    const expected = {
      type: 'dialog/close',
      payload: undefined,
    };

    // Act
    const result = store.dispatch(dialog.actions.close());

    // Assert
    expect(result).toEqual(expected);
    expect(store.getState().dialog).toBeNull();
  });
});
