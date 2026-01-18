import { pgTable, text, timestamp, integer, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(), // Clerk ID
    email: text("email").notNull(),
    name: text("name"),
    imageUrl: text("image_url"),
    credits: integer("credits").default(5).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const generations = pgTable("generations", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    prompt: text("prompt"),
    styleId: text("style_id"),
    inputImageUrl: text("input_image_url"), // URL of the photo the user uploaded
    outputImageUrl: text("output_image_url"), // URL of the generated AI image (Vercel Blob)
    isPublic: boolean("is_public").default(false).notNull(),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    status: text("status").default("completed").notNull(), // 'pending', 'completed', 'failed'
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
