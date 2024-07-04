import "dotenv/config";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';

const databaseUrl = ("postgresql://restaurantdb_owner:6GgFqkEKl0PC@ep-quiet-rice-a2ysi7tf.eu-central-1.aws.neon.tech/transportdb?sslmode=require")
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const sql = neon(databaseUrl);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, { schema, logger: true });