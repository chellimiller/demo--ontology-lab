// Types are kept outside of the './entities' file to avoid circular dependencies.

/**
 * Example entity stored in Dexie.
 */
export type Entity = {
  id: string;
  name: string;
};
