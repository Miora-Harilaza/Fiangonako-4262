import { eq } from "drizzle-orm";
import { db } from "../src/api/database";
import { administrators, user } from "../src/api/database/schema";

async function main() {
  const [rawEmail, ...extraArgs] = process.argv.slice(2);
  const email = rawEmail?.trim().toLowerCase();

  if (!email || extraArgs.length > 0 || !email.includes("@")) {
    throw new Error(
      "Usage: bun --env-file=../../.env scripts/authorize-admin.ts EMAIL",
    );
  }

  const [account] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (!account) {
    throw new Error(
      `No account found for ${email}. Create the account before authorizing it.`,
    );
  }

  await db
    .insert(administrators)
    .values({ userId: account.id })
    .onConflictDoNothing();

  console.log(`Administrator access authorized for ${email}.`);
}

await main();
