import ProductCard from "./ProductCard"; // Assuming you have the ProductCard component

const products = [
  {
    name: "Stylish Leather Jacket",
    description: "A high-quality leather jacket perfect for all seasons.",
    price: "99.99",
    image: "/hero-section-1.webp",
  },
  {
    name: "Stylish Leather Jacket",
    description: "A high-quality leather jacket perfect for all seasons.",
    price: "99.99",
    image: "/path/to/jacket1.jpg",
  },
  {
    name: "Winter Boots",
    description: "Warm and durable boots for winter.",
    price: "79.99",
    image: "/path/to/boots.jpg",
  },
  {
    name: "Casual Sneakers",
    description: "Comfortable sneakers for everyday use.",
    price: "49.99",
    image: "/path/to/sneakers.jpg",
  },
];

export default function ProductCardGrid() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
