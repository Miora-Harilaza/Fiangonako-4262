import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { events, members, administrators } from "../database/schema";
import { auth } from "../auth";

const admin = base.use(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  if (!session) throw new ORPCError("UNAUTHORIZED");
  const rows = await db
    .select()
    .from(administrators)
    .where(eq(administrators.userId, session.user.id));
  if (!rows.length)
    throw new ORPCError("FORBIDDEN", { message: "Tsy manana alalana hitantana ianao." });
  return next({ context: { user: session.user } });
});
const eventInput = z.object({
  title: z.string().min(3).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  category: z.enum(["Fanompoam-pivavahana", "Tanora", "Fiaraha-mivavaka", "Hira"]),
  location: z.string().min(2).max(200),
  description: z.string().min(5).max(5000),
  demo: z.boolean(),
});
const memberInput = z.object({
  name: z.string().min(2).max(150),
  email: z.union([z.email(), z.literal("")]),
  phone: z.string().max(50),
  group: z.string().max(150),
});
export const church = {
  events: base.handler(() => db.select().from(events).orderBy(asc(events.date))),
  access: base.handler(async ({ context }) => {
    const session = await auth.api.getSession({ headers: context.headers });
    if (!session) return { signedIn: false, isAdmin: false };
    const rows = await db
      .select()
      .from(administrators)
      .where(eq(administrators.userId, session.user.id));
    return { signedIn: true, isAdmin: rows.length > 0 };
  }),
  saveEvent: admin
    .input(eventInput.extend({ id: z.number().optional() }))
    .handler(async ({ input }) => {
      const { id, ...values } = input;
      return id
        ? db.update(events).set(values).where(eq(events.id, id)).returning()
        : db.insert(events).values(values).returning();
    }),
  deleteEvent: admin
    .input(z.object({ id: z.number() }))
    .handler(({ input }) => db.delete(events).where(eq(events.id, input.id)).returning()),
  members: admin.handler(() => db.select().from(members).orderBy(asc(members.name))),
  saveMember: admin
    .input(memberInput.extend({ id: z.number().optional() }))
    .handler(async ({ input }) => {
      const { id, ...values } = input;
      return id
        ? db.update(members).set(values).where(eq(members.id, id)).returning()
        : db.insert(members).values(values).returning();
    }),
  deleteMember: admin
    .input(z.object({ id: z.number() }))
    .handler(({ input }) => db.delete(members).where(eq(members.id, input.id)).returning()),
};
