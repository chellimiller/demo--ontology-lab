import { useLiveQuery } from 'dexie-react-hooks';
import database from './_dexie';
import { useEntities, useEntity, setEntity, removeEntity } from './entities';
import { Entity } from './types';

jest.mock('./_dexie.ts', () => ({
  __esModule: true,
  default: {
    entities: {
      delete: jest.fn().mockReturnValue(Promise.resolve()),
      get: jest
        .fn()
        .mockImplementation((id) => Promise.resolve({ id, name: id })),
      put: jest.fn().mockImplementation((_data, id) => Promise.resolve(id)),
      toArray: jest.fn().mockReturnValue(() => [
        { id: 'foo', name: 'foo' },
        { id: 'bar', name: 'bar' },
      ]),
    },
  },
}));

jest.mock('dexie-react-hooks', () => ({
  useLiveQuery: jest.fn().mockImplementation((promise) => {
    promise();
    return [];
  }),
}));

describe('data/database/entities', () => {
  describe('useEntity', () => {
    it('should use useLiveQuery with a query to database.entities.get', () => {
      // Arrange
      const id = 'foo-bar';

      // Act
      useEntity(id);

      // Assert
      expect(database.entities.get).toHaveBeenCalledWith(id);
      expect(useLiveQuery).toHaveBeenCalled();
    });
  });

  describe('useEntities', () => {
    it('should use useLiveQuery with a query to database.entities.toArray()', () => {
      // Act
      useEntities();

      // Assert
      expect(database.entities.toArray).toHaveBeenCalled();
      expect(useLiveQuery).toHaveBeenCalled();
    });

    it('should return empty array when useLiveQuery returns undefined', () => {
      // Arrange
      (useLiveQuery as jest.Mock).mockReturnValueOnce(undefined);

      // Act
      const result = useEntities();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('removeEntity', () => {
    it('should call database.entities.delete', async () => {
      // Arrange
      const id = 'foo-bar';

      // Act
      await removeEntity(id);

      // Assert
      expect(database.entities.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('setSetting', () => {
    it('should call database.entities.put', async () => {
      // Arrange
      const id = 'foo-bar';
      const entity: Entity = {
        id,
        name: 'Foo Bar',
      };

      // Act
      await setEntity(entity);

      // Assert
      expect(database.entities.put).toHaveBeenCalledWith(entity, id);
    });
  });
});
