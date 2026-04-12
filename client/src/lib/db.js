export const db = {
  product: {
    findMany: async () => {
      const res = await fetch("/products.json");
      return res.json();
    },
    findUnique: async ({ where }) => {
      const res = await fetch("/products.json");
      const products = await res.json();
      return products.find((p) => Number(p.id) === Number(where.id)) || null;
    },
  },
};




// const products = [
//   {
//     id: 1,
//     name: "Red Gaming Chair",
//     description: "Comfortable leather gaming chair",
//     price: 90.0,
//     original_price: 150.0,
//     stock_available: 10,
//     category: "Gaming Chair",
//     image_url1: "/images/red-chair-1.jpg",
//     image_url2: "/images/red-chair-2.jpg",
//     long_description: "High back ergonomic chair with adjustable armrests.",
//     short_description: "Stylish red gaming chair.",
//     color: "Red",
//     size_variation: "Standard",
//     featured: true,
//     rating: 4.8,
//     reviews_count: 4540,
//   },
//   {
//     id: 2,
//     name: "Blue Tennis Racket",
//     description: "Lightweight racket for beginners",
//     price: 45.0,
//     original_price: 70.0,
//     stock_available: 20,
//     category: "Tennis",
//     image_url1: "/images/tennis-racket.jpg",
//     short_description: "Durable and easy to handle.",
//     color: "Blue",
//     size_variation: "Standard",
//     featured: false,
//     rating: 4.3,
//     reviews_count: 120,
//   },
// ];

// export const db = {
//   product: {
//     findMany: async () => products,
//     findUnique: async ({ where }) => {
//       console.log("Looking for product id:", where.id);
//       return products.find((p) => Number(p.id) === Number(where.id)) || null;
//     },
//   },
// };