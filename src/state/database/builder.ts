import { useLiveQuery } from 'dexie-react-hooks';
import database from './_dexie';
import { BuilderEntity } from './types';

function getBuilderEntity(
  id: BuilderEntity['id']
): Promise<BuilderEntity | undefined> {
  return database.builder.get(id);
}

export function useBuilderEntity(
  id: BuilderEntity['id']
): BuilderEntity | undefined {
  return useLiveQuery(() => getBuilderEntity(id), [id]);
}

function getBuilderEntities(): Promise<BuilderEntity[]> {
  return database.builder.toArray();
}

export function useBuilderEntities(): BuilderEntity[] {
  return useLiveQuery(getBuilderEntities) ?? [];
}

export function removeBuilderEntity(id: BuilderEntity['id']): Promise<void> {
  return database.builder.delete(id);
}

export function setBuilderEntity(data: BuilderEntity): Promise<string> {
  return database.builder.put(data, data.id);
}
