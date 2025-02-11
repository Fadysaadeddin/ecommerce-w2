import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import useFetch from "./useFetch";
import { useFavorites } from "./FavoritesContext";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const navigate = useNavigate();


  const {
    data: products,
    loading,
    error,
    refetch,
  } = useFetch("https://fakestoreapi.com/products", [selectedCategory]);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products";
    refetch(url);
  };

  if (loading) return <p className="loading-message">LOADING PRODUCTS ...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div>
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
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
            <button
              className="favorite-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
            >
              {favoriteIds.includes(product.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
