//frontend/src/components/ProductGrid.jsx


import ProductCard from "./ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Stay connected with this sleek smart watch.",
    price: 199.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    price: 49.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "4K Monitor",
    description: "Ultra HD 4K monitor for stunning visuals.",
    price: 299.99,
    image: "https://via.placeholder.com/150",
  },
];

export default function ProductGrid({ onAddToCart }) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

