import store from './store';
import {
  closeDialog,
  openDialog,
  openCreditsDialog,
  resetThemeMode,
  setThemeMode,
  toggleThemeMode,
} from './actions';
import { DialogKey } from './dialog.slice';

jest.mock('./store.ts', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

describe('data/store/actions', () => {
  afterEach(jest.resetAllMocks);

  describe('closeDialog', () => {
    it('should dispatch action to close dialog', () => {
      // Act
      closeDialog();

      // Assert
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    it('should dispatch action to open dialog', () => {
      // Arrange
      const dialog = {
        key: 'foo' as DialogKey,
        data: { foo: 'test', bar: 123 },
      };

      // Act
      openDialog(dialog);

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'dialog/open',
        payload: dialog,
      });
    });
  });

  describe('openCreditsDialog', () => {
    it('should dispatch action to open credits dialog', () => {
      // Arrange
      const dialog = {
        key: DialogKey.CREDITS,
        data: {},
      };

      // Act
      openCreditsDialog();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'dialog/open',
        payload: dialog,
      });
    });
  });

  describe('toggleThemeMode', () => {
    it('should dispatch action to toggle light/dark mode', () => {
      // Act
      toggleThemeMode();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/toggleMode',
        payload: undefined,
      });
    });
  });

  describe('resetThemeMode', () => {
    it('should dispatch action to reset light/dark mode to user preference', () => {
      // Act
      resetThemeMode();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/resetMode',
        payload: undefined,
      });
    });
  });

  describe('setThemeMode', () => {
    it('should dispatch action to set light/dark mode to provided value', () => {
      // Act
      setThemeMode('light');

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/setMode',
        payload: 'light',
      });
    });
  });
});
