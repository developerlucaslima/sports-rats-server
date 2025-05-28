import { compare } from 'bcryptjs';

/**
 * Compares a plain text password with a hash.
 * Returns true if the password is valid, false otherwise.
 */
export async function comparePasswordHash(
  plainPassword: string,
  passwordHash?: string,
): Promise<boolean> {
  if (!passwordHash) return false;
  return compare(plainPassword, passwordHash);
}
