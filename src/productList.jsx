import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./categoryList";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : "https://fakestoreapi.com/products";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();

        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <p className="loading-message">LOADING PRODUCTS ...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div>
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <h2>PRODUCTS</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
