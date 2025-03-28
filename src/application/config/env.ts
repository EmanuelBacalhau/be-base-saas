import 'dotenv/config';
import z from 'zod';
import { InvalidEnvironmentVariableError } from '../errors/InvalidEnvironmentVariableError';

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  BCRYPT_SALT: z.coerce.number(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error(error.issues);
  throw new InvalidEnvironmentVariableError();
}

export const env = data;
