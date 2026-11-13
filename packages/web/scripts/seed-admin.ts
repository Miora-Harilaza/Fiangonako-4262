import { eq } from "drizzle-orm";
import { auth } from "../src/api/auth";
import { db } from "../src/api/database";
import { administrators, user } from "../src/api/database/schema";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const name = process.env.SEED_ADMIN_NAME?.trim();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !email.includes("@") || !name) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_NAME before running this script.",
    );
  }

  const [existingAccount] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  let userId = existingAccount?.id;

  if (!userId) {
    if (!password || password.length < 10) {
      throw new Error(
        "Set SEED_ADMIN_PASSWORD to a password with at least 10 characters.",
      );
    }

    const result = await auth.api.signUpEmail({
      body: { email, name, password },
    });
    userId = result.user.id;
  }

  await db
    .insert(administrators)
    .values({ userId })
    .onConflictDoNothing();

  console.log(`Administrator account ready for ${email}.`);
}

await main();
