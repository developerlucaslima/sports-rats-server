import { hash } from 'bcryptjs'

/**
 * Generates a hash from a plain text password.
 * @param plainPassword - The plain text password to hash
 * @param saltRounds - Number of salt rounds (default: 12)
 * @returns Promise with the hashed password
 */
export async function generatePasswordHash(
  plainPassword: string,
  saltRounds: number = 8,
): Promise<string> {
  return hash(plainPassword, saltRounds)
}
