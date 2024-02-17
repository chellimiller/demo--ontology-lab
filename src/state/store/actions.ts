// Actions are bound to the store to avoid Redux-specific concerns outside the module.
import store from './store';
import theme, { ThemeState } from './theme.slice';
import dialog, { DialogKey, DialogStateOpen } from './dialog.slice';

export function closeDialog(): void {
  store.dispatch(dialog.actions.close());
}

export function openDialog(payload: DialogStateOpen): void {
  store.dispatch(dialog.actions.open(payload));
}

export function openCreditsDialog(): void {
  openDialog({ key: DialogKey.CREDITS, data: {} });
}

export function toggleThemeMode(): void {
  store.dispatch(theme.actions.toggleMode());
}

export function resetThemeMode(): void {
  store.dispatch(theme.actions.resetMode());
}

export function setThemeMode(mode: ThemeState['mode']): void {
  store.dispatch(theme.actions.setMode(mode));
}
