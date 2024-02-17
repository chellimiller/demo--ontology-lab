import { useLiveQuery } from 'dexie-react-hooks';
import database from './_dexie';
import { Entity } from './types';

function getEntity(id: Entity['id']): Promise<Entity | undefined> {
  return database.entities.get(id);
}

export function useEntity(id: Entity['id']): Entity | undefined {
  return useLiveQuery(() => getEntity(id), [id]);
}

function getEntities(): Promise<Entity[]> {
  return database.entities.toArray();
}

export function useEntities(): Entity[] {
  return useLiveQuery(getEntities) ?? [];
}

export function removeEntity(id: Entity['id']): Promise<void> {
  return database.entities.delete(id);
}

export function setEntity(data: Entity): Promise<string> {
  return database.entities.put(data, data.id);
}
