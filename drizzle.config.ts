import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
    schema:"./database/schema/index.ts",
    out:"./database/migrations",
    dialect:"postgresql",
    dbCredentials:{
        url:process.env.NEON_DB_URL!,
    },
    strict:true,
})