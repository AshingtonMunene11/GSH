import products from "@/data/products.json";

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function ProductPage({ params }) {
  const { category, name } = params;

  const product = products.find(
    (p) =>
      slugify(p.category) === category &&
      slugify(p.name) === name
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.offer_price}</p>
    </div>
  );
}
