import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function getOrCreateUser() {
  // 1. Ask Clerk: who is logged in?
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  // 2. Look for this user in OUR database
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUser.id));

  // 3. Found them? Return them.
  if (existing.length > 0) return existing[0];

  // 4. Not found? This is their first visit, so create them.
  const [newUser] = await db
    .insert(users)
    .values({
      clerkId: clerkUser.id,
      name: clerkUser.fullName,
      email: clerkUser.primaryEmailAddress?.emailAddress,
      imageUrl: clerkUser.imageUrl,
    })
    .returning();

  return newUser;
}