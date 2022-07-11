/**
 * Creates a filter array for Prisma WHERE clause.
 * @param options Filtering options
 * @returns Filter array for Prisma WHERE clause or undefined if no search term is provided
 */
export function createGlobalFilter<T>(
  options: FilterOptions<T>
): unknown[] | undefined {
  const { matchType, search, includedFields, mode } = options;

  if (!search) {
    // Prisma won't apply filtering if undefined is set as filter
    return undefined;
  }

  const filters = [];

  Object.keys(includedFields).forEach((field) => {
    const filter = {
      [field]: {
        [matchType]: search,
        mode: mode ?? 'insensitive',
      },
    };

    filters.push(filter);
  });

  return filters;
}

type IncludedKeys<T> = {
  [key in keyof T]?: boolean;
};

type MatchType =
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

interface FilterOptions<T> {
  matchType: MatchType;
  search: string;
  includedFields?: IncludedKeys<T>;
  mode?: QueryMode;
}

type QueryMode = 'default' | 'insensitive';
