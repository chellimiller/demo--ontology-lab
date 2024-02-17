import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import theme, { ThemeState } from './theme.slice';
import dialog, { DialogState } from './dialog.slice';

export type AppState = {
  theme: ThemeState;
  dialog: DialogState;
};

const SetTransform = createTransform(
  /**
   * transform state on its way to being serialized and persisted.
   */
  (inboundState: AppState) => ({ ...inboundState }),

  /**
   * transform state being rehydrated.
   */
  (outboundState: AppState) => ({ ...outboundState }),

  /**
   * define which reducers this transform gets called for.
   */
  { whitelist: ['theme'] }
);

const themeReducer = persistReducer(
  {
    key: theme.name,
    storage,
    transforms: [SetTransform],
  },
  theme.reducer
);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    dialog: dialog.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
