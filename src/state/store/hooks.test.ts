import { renderHook, act } from '@testing-library/react';
import { useDialogData, useDialogIsOpen, useThemeMode } from './hooks';
import {
  closeDialog,
  openDialog,
  setThemeMode,
  toggleThemeMode,
} from './actions';
import { DialogKey } from './dialog.slice';

describe('data/store/hooks', () => {
  afterEach(jest.resetAllMocks);

  describe('useThemeMode', () => {
    it('should return current theme mode', () => {
      // Arrange
      act(() => setThemeMode('light'));

      // Act
      const { result, rerender } = renderHook(() => useThemeMode());

      // Assert
      expect(result.current).toBe('light');

      // Act
      act(() => toggleThemeMode());
      rerender();

      // Assert
      expect(result.current).toBe('dark');

      // Teardown
      act(() => setThemeMode('light'));
    });
  });

  describe('useDialogIsOpen', () => {
    it('should return whether specified dialog is currently open', () => {
      // Arrange
      const key = DialogKey.CREDITS;
      const data = { hello: 'world' };

      // Act
      const { result, rerender } = renderHook(() => useDialogIsOpen(key));

      // Assert
      expect(result.current).toBe(false);

      // Act
      act(() => openDialog({ key, data }));
      rerender();

      // Assert
      expect(result.current).toBe(true);

      // Teardown
      act(() => closeDialog());
    });
  });

  describe('useDialogData', () => {
    it('should return specified dialog data', () => {
      // Arrange
      const key = 'foo' as DialogKey;
      const data = { hello: 'world' };
      const next = { hola: 'mundo' };

      // Act
      const { result, rerender } = renderHook(() => useDialogData(key));
      expect(result.current).toBeNull();

      // Act
      act(() => openDialog({ key, data }));
      rerender();

      // Assert
      expect(result.current).toEqual(data);

      // Change data to new value
      act(() => openDialog({ key, data: next }));
      rerender();
      expect(result.current).toBe(next);

      // Verify data remains unchanged when given equivalent data.
      act(() => openDialog({ key, data: { hola: 'mundo' } }));
      rerender();
      expect(result.current).toBe(next);

      // Teardown
      act(() => closeDialog());
    });
  });
});
