import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

export enum DialogKey {
  CREDITS = 'credits',
}

export type AnyDialogData = Record<string, unknown>;

type BaseDialogState<
  K extends DialogKey,
  D extends AnyDialogData = AnyDialogData
> = { key: K; data: D };

// This could be modified to be a union type for stricter type validation.
export type DialogState = null | BaseDialogState<DialogKey.CREDITS>;

export type DialogStateOpen = Exclude<DialogState, null>;

const initialState: DialogState = null;

type DialogReducers = {
  open(state: DialogState, action: PayloadAction<DialogStateOpen>): DialogState;
  close(state: DialogState, action: Action): DialogState;
};

function isOpen(state: DialogState, key?: DialogKey): state is DialogStateOpen {
  if (key) return state?.key === key;
  return !!state;
}

function getData<K extends DialogKey, D extends AnyDialogData = AnyDialogData>(
  state: DialogState,
  key: K
): D | null {
  if (state?.key === key) return state?.data as D;
  return null;
}

const dialog = createSlice<
  DialogState,
  DialogReducers,
  'dialog',
  { isOpen: typeof isOpen; getData: typeof getData }
>({
  name: 'dialog',
  initialState,
  reducers: {
    open: (
      state: DialogState,
      { payload }: PayloadAction<DialogStateOpen>
    ): DialogState => (isEqual(state, payload) ? state : payload),
    close: () => null,
  },
  selectors: { getData, isOpen },
});

export default dialog;
