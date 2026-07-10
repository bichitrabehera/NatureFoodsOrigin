import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, products } from "./schema";

config({ path: "../../.env.local" });

const staticProducts = [
  {
    id: "1",
    name: "Garden Fresh Bowl",
    description: "Quinoa, avocado, cherry tomatoes, mixed greens with lemon vinaigrette",
    price: 12.99,
    category: "bowls",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "2",
    name: "Tropical Green Smoothie",
    description: "Spinach, mango, banana, coconut milk, chia seeds",
    price: 7.99,
    category: "juices",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80",
  },
  {
    id: "3",
    name: "Avocado Toast",
    description: "Sourdough, smashed avocado, cherry tomatoes, microgreens",
    price: 9.99,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80",
  },
  {
    id: "4",
    name: "Berry Acai Bowl",
    description: "Acai, mixed berries, granola, honey drizzle, coconut flakes",
    price: 11.99,
    category: "bowls",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80",
  },
  {
    id: "5",
    name: "Detox Green Juice",
    description: "Celery, cucumber, green apple, ginger, lemon",
    price: 6.99,
    category: "juices",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80",
  },
  {
    id: "6",
    name: "Sweet Potato Fries",
    description: "Crispy baked sweet potato fries with rosemary aioli",
    price: 7.49,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
  },
];

const staticCategories = ["all", "bowls", "juices", "snacks"] as const;

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const existing = await db.select().from(categories);
  if (existing.length > 0) {
    console.log("Database already seeded, skipping.");
    process.exit(0);
  }

  const catSlugs = staticCategories.filter((c) => c !== "all");
  const catMap: Record<string, number> = {};

  for (const slug of catSlugs) {
    const name = slug.charAt(0).toUpperCase() + slug.slice(1);
    const [cat] = await db
      .insert(categories)
      .values({ name, slug })
      .returning({ id: categories.id });
    catMap[slug] = cat.id;
  }

  for (const p of staticProducts) {
    await db.insert(products).values({
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      categoryId: catMap[p.category],
      image: p.image,
    });
  }

  console.log("Seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
