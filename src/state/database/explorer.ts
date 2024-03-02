import { useLiveQuery } from 'dexie-react-hooks';
import database from './_dexie';
import { ExplorerEntity } from './types';
import useAsyncLiveQuery from './useAsyncLiveQuery';

function getExplorerEntity(
  id: ExplorerEntity['id']
): Promise<ExplorerEntity | undefined> {
  return database.explorer.get(id);
}

export function useExplorerEntity(id: ExplorerEntity['id']) {
  return useAsyncLiveQuery(() => getExplorerEntity(id), [id]);
}

function getExplorerEntities(): Promise<ExplorerEntity[]> {
  return database.explorer.toArray();
}

export function useExplorerEntities(): ExplorerEntity[] {
  return useLiveQuery(getExplorerEntities) ?? [];
}

export function removeExplorerEntity(id: ExplorerEntity['id']): Promise<void> {
  return database.explorer.delete(id);
}

export function setExplorerEntity(data: ExplorerEntity): Promise<string> {
  return database.explorer.put(data, data.id);
}
