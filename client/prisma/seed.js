import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  await db.product.create({
    data: {
      name: "Red Gaming Chair",
      description: "Comfortable leather gaming chair",
      price: 90.0,
      original_price: 150.0,
      stock_available: 10,
      category: "Gaming Chair",
      image_url1: "/images/red-chair-1.jpg",
      image_url2: "/images/red-chair-2.jpg",
      long_description: "High back ergonomic chair with adjustable armrests.",
      short_description: "Stylish red gaming chair.",
      color: "Red",
      size_variation: "Standard",
      featured: true,
      rating: 4.8,
      reviews_count: 4540,
    },
  });
}

main()
  .then(() => {
    console.log("Seed data created");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
