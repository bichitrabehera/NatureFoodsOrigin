import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Garden Fresh Bowl",
    description:
      "Quinoa, avocado, cherry tomatoes, mixed greens with lemon vinaigrette",
    price: 299,
    category: "bowls",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "2",
    name: "Tropical Green Smoothie",
    description: "Spinach, mango, banana, coconut milk, chia seeds",
    price: 299,
    category: "juices",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80",
  },
  {
    id: "3",
    name: "Avocado Toast",
    description: "Sourdough, smashed avocado, cherry tomatoes, microgreens",
    price: 299,
    category: "snacks",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80",
  },
  {
    id: "4",
    name: "Berry Acai Bowl",
    description: "Acai, mixed berries, granola, honey drizzle, coconut flakes",
    price: 299,
    category: "bowls",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80",
  },
  {
    id: "5",
    name: "Detox Green Juice",
    description: "Celery, cucumber, green apple, ginger, lemon",
    price: 299,
    category: "juices",
    image:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80",
  },
  {
    id: "6",
    name: "Sweet Potato Fries",
    description: "Crispy baked sweet potato fries with rosemary aioli",
    price: 299,
    category: "snacks",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
  },
];

export const categories = ["all", "bowls", "juices", "snacks"] as const;
