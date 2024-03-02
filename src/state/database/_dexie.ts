import Dexie, { Table } from 'dexie';
import { BuilderEntity, ExplorerEntity } from './types';

export class DexieDatabase extends Dexie {
  builder!: Table<BuilderEntity, BuilderEntity['id']>;

  explorer!: Table<ExplorerEntity, ExplorerEntity['id']>;

  constructor() {
    super('demo-ontology-lab');
    this.version(1).stores({
      builder: '++id',
      explorer: '++id',
    });
  }
}

const database = new DexieDatabase();

export default database;
