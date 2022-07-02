/**
 * Creates a filter array for Prisma WHERE clause.
 * @param options Filtering options
 * @returns Filter array for Prisma WHERE clause or undefined if no search term is provided
 */
export function createGlobalFilter<T>(
  options: FilterOptions<T>
): unknown[] | undefined {
  const { matchType, search, model, includedFields = [] } = options;

  if (!search) {
    // Prisma won't apply filtering if undefined is set as filter
    return undefined;
  }

  const filters = [];

  for (const [key] of Object.entries(model)) {
    const filter = {
      [key]: {
        [matchType]: search,
      },
    };

    if (includedFields.includes(key as IncludedKey<T>)) {
      filters.push(filter);
    }
  }

  return filters;
}

export type MatchType =
  | 'equals'
  | 'not'
  | 'in'
  | 'notIn'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

export type IncludedKey<T> = keyof T;

export interface FilterOptions<T> {
  model: T;
  matchType: MatchType;
  search: string;
  includedFields?: IncludedKey<T>[];
}
