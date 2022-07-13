import { UserRole } from '../constants/user-roles.constants';

/**
 * It takes an array of strings and a string and returns a boolean
 * @param {string[]} userRoles - string[] - The user's roles
 * @param {UserRole} requiredRole - The role that the user must have to be able to gain access.
 * @returns A boolean value.
 */
export function includesRole(
  userRoles: string[],
  requiredRole: UserRole
): boolean {
  return userRoles.includes(requiredRole);
}
